var tungus = require('tungus')
var mongoose = require('mongoose')

//var config = require('./config')

var url = /*config.DB_URL || */'tingodb://db'

mongoose.connect(url, function (err) {
    if (err) {
        console.log(error);
    }
    console.log('Connected to MongoDB@%s', url);
})
module.exports = mongoose
