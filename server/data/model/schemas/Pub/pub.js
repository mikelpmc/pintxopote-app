const {
    Schema,
    Schema: { ObjectId }
} = require('mongoose');

const pubAddress = require('./pubAddress');

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    pintxopotes: [
        {
            type: ObjectId,
            ref: 'Pintxopote'
        }
    ],
    address: pubAddress,
    desc: {
        type: String
    }
});
