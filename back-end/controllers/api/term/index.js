var router = require('express').Router({mergeParams: true})

router.use(require('./votes'))

module.exports = router
