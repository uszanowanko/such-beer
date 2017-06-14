var router = require('express').Router()

//router.use(require('../auth'))

router.use('/api', require('./api'))
router.use('/angular', require('./angular'))
router.use('/sapui5', require('./sapui5'))

module.exports = router