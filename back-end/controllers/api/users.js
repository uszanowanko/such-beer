var router = require('express').Router()
var User = require('../../models/user')


router.post('/users', function (req, res, next) {
    var user = new User({
        name: req.body.name
    })
    user.save(function (err, user) {
        if (err) {
            return next(err)
        }
        res.cookie('user',user._id.toString(), { maxAge: 2147483647 , httpOnly: true, secure: false}); //"never" expiring cookie
        res.status(201).json(user)
    })
})

router.get('/user', function (req, res, next) {
    if (!req.cookies || !req.cookies.user) {
        return res.status(401).end();
    }
    var user = User.findById(req.cookies.user)
    .select('name')
    .exec(function (err, user) {
        if (err || !user) {
            return res.status(401).end();
        }
        res.json(user)
    })
})

router.post('/logout', function (req, res, next) {
    if (!req.cookies || !req.cookies.user) {
        return res.status(401).end();
    }
    var user = User.findById(req.cookies.user)
    .select('name')
    .exec(function (err, user) {
        if (err) {
            return next(err)
        }
        if (user._id.toString() === req.cookies.user) {
            res.clearCookie("user");
            res.status(200).end();
            
        }
        res.status(401).end()
    })
})

module.exports = router
