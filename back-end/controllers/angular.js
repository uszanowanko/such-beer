var path = require('path')
var express = require('express')
var router  = express.Router()

router.use(express.static(__dirname + '/../../AngularJS/assets'))
router.use('/views', express.static(__dirname + '/../../AngularJS/views'))
router.use('/resources', express.static(__dirname + '/../../AngularJS/resources'))

router.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../AngularJS/layouts/main.html'))
})

module.exports = router