var router = require('express').Router({mergeParams: true})
var Term = require('../../../models/term')
var Vote = require('../../../models/vote')
var User = require('../../../models/user')


router.post('/votes', function (req, res, next) {
    if (!req.cookies || !req.cookies.user) {
        return res.status(401).end();
    }
    Term.findById(req.params.termId)
        .populate('votes')
        .exec(function (err, term) {
        if (err) {
            return next(err)
        }
        var vote = term.votes.find((vote) => vote.user.toString() === req.cookies.user);
        if (vote) {
            vote.score = req.body.score;
            vote.save(function (err, vote) {
                if (err) {
                    return next(err)
                }
                User.find(function(err, users) {
                    if (err) {
                        return next(err)
                    }
                    var userCount = users.length;
                    term.score = parseInt(term.votes.reduce((a,b) => a+b.score,0)/userCount);
                    res.status(200).json(term)
                })
            })
        }
        else {
            var vote = new Vote({
                score: req.body.score,
                user: req.cookies.user
            })
            vote.save(function (err, vote) {
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
                        res.status(201).json(term)
                    })
                });
            })
        }
    })
})

router.get('/votes', function (req, res, next) {
    Term.findById(req.params.termId)
        .populate('votes')
        .exec(function (err, term) {
        if (err) {
            return next(err)
        }
        if (!term) {
            return res.status(404).end();
        }
        Term.populate(term, {
            path: 'votes.user',
            select: 'name',
            model: 'user'
        },
        function(err, user) {
            if (err) {
                return next(err);
            }
            res.json(term.votes)
        });
    })
})

module.exports = router
