var router = require('express').Router({mergeParams: true})
var Term = require('../../../models/term')
var Vote = require('../../../models/vote')
var User = require('../../../models/user')


router.post('/votes', function (req, res, next) {
    Term.findById(req.params.termId)
        .populate('votes')
        .exec(function (err, term) {
        if (err) {
            return next(err)
        }
        var vote = term.votes.find((vote) => vote.user.toString() === req.user._id.toString());
        if (vote) {
            vote.score = req.body.score;
            vote.save(function (err) {
                if (err) {
                    return next(err)
                }
                User.find(function(err, users) {
                    if (err) {
                        return next(err)
                    }
                    var userCount = users.length;
                    term.myScore = vote.score;
                    term.score = term.votes? parseInt(term.votes.reduce((a,b) => a+b.score,0)/userCount) : 0;
                    term.votes = undefined;
                    res.status(200).json(term)
                })
            })
        }
        else {
            var vote = new Vote({
                score: req.body.score,
                user: req.user._id
            })
            vote.save(function (err) {
                if (err) {
                    return next(err)
                }
                term.votes.push(vote);
                term.save(function (err, term) {
                    if (err) {
                        vote.remove();
                        return next(err)
                    }
                    User.find(function(err, users) {
                        if (err) {
                            return next(err)
                        }
                        var userCount = users.length;
                        term.score = parseInt(term.votes.reduce((a,b) => a+b.score,0)/userCount);
                        term.myScore = vote.score;
                        term.votes = undefined;
                        res.status(201).json(term)
                    })
                });
            })
        }
    })
})

module.exports = router
