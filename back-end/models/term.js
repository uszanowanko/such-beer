var db = require('../db')
//require('./line')

var song = db.model('term', {
    date: {
        type: Date,
        required: true
    },
    added: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = song
