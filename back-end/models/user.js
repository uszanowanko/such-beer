var db = require('../db')

var user = db.model('user', {
    name: {
        type: String,
        required: true
    }
})

module.exports = user
