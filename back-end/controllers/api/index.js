var router = require('express').Router()
var bodyParser = require('body-parser')
var User = require('../../models/user')

router.use(bodyParser.json())

router.use(require('./users'))

router.use(function (req, res, next) {
    if (!req.cookies || !req.cookies.user) {
        return res.sendStatus(401);
    } else {
        User.findById(req.cookies.user)
            .exec(function(err, user) {
                if (err || !user) {
                    res.clearCookie("user");
                    return res.sendStatus(401);
                }
                req.user = user
                return next();
        })
    }
});

router.use(require('./terms'))

module.exports = router
