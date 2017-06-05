var db = require('../db')
require('./vote')

var term = db.model('term', {
    date: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    added: {
        type: Date,
        required: true,
        default: Date.now
    },
    score: {
        type: Number,
        default: 0
    },
    myScore: {
        type: Number,
        default: 0
    },
    votes: [{
        type: db.Schema.Types.ObjectId,
        ref: 'vote'
    }],
})

module.exports = term
