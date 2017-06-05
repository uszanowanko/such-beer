var path = require('path')
var express = require('express')
var router  = express.Router()

router.use(express.static(__dirname + '/../../SapUI5'))

module.exports = router