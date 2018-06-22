const {
    Schema,
    Schema: { ObjectId }
} = require('mongoose');

const Score = require('./score');

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: true
    },
    score: Score,
    pub: {
        type: ObjectId,
        ref: 'Pub',
        required: true
    }
});
