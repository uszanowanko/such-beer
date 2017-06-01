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
        res.cookie('user',user._id, { maxAge: 900000, httpOnly: true, secure: false});
        res.status(201).json(user)
    })
})

module.exports = router
