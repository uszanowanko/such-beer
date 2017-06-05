var router = require('express').Router()
var Term = require('../../models/term')
var User = require('../../models/user')


router.post('/terms', function (req, res, next) {
    var term = new Term({
        date: req.body.date,
        name: req.body.name
    })
    term.save(function (err, term) {
        if (err) {
            return next(err)
        }
        res.status(201).json(term)
    })
})

router.get('/terms', function (req, res, next) {
    if (!req.cookies || !req.cookies.user) {
        return res.status(401).end();
    }
    Term.find()
    .populate('votes')
    .exec(function (err, terms) {
        if (err) {
            return next(err)
        }
        User.find(function(err, users) {
            if (err) {
                return next(err)
            }
            var userCount = users.length;
            terms.forEach((term,index,arr) => {
                var sum = term.votes.reduce((a,b) => a+b.score,0);
                var userVote = term.votes? term.votes.find((vote) => vote.user.toString() === req.cookies.user) : null;
                arr[index].myScore = userVote? userVote.score : 0;
                arr[index].score = parseInt(sum/userCount);
                arr[index].votes = undefined;
            })
            res.json(terms);
        })
    });
})

router.use('/term/:termId', require('./term'))

module.exports = router
