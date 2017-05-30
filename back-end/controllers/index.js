var router = require('express').Router()

//router.use(require('../auth'))

router.use('/api', require('./api'))
router.use('/angular', require('./angular'))

module.exports = router