var express    = require('express')
var logger     = require('morgan')
var db         = require('./db')

var app = express()
app.use(logger('dev'))
app.use(require('./controllers'))

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server successfully started on port %d', server.address().port)
})
