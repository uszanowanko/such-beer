var router = require('express').Router({mergeParams: true})
var Term = require('../../../models/term')
var Vote = require('../../../models/vote')


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
        var vote = new Vote({
            score: req.body.score,
            user: req.cookies.username
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
                res.status(201).json(vote)
            });
        })
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
