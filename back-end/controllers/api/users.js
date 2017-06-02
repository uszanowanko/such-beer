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
//        res.clearCookie("username");
        res.cookie('user',user._id.toString(), { maxAge: 900000, httpOnly: true, secure: false});
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
        if (err) {
            return next(err)
        }
        res.json(user)
    })
})

module.exports = router
