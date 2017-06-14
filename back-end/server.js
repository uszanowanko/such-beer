var express         = require('express')
var logger          = require('morgan')
var db              = require('./db')
var cookieParser    = require('cookie-parser')

var app = express()
app.use(logger('dev'))
var app = express()
app.use(cookieParser())
app.use(require('./controllers'))

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server successfully started on port %d', server.address().port)
})
