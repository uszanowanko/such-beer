var router = require('express').Router()
var Term = require('../../models/term')


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
    Term.find(function (err, term) {
        if (err) {
            return next(err)
        }
        res.json(term);
    });
})

router.use('/term/:termId', require('./term'))

module.exports = router
