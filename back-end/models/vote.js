var db = require('../db')

var vote = db.model('vote', {
    score: {
        type: Number,
        required: true
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
})

module.exports = vote
