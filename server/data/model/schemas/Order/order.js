const {
    Schema,
    Schema: { ObjectId }
} = require('mongoose');

module.exports = new Schema({
    quantity: {
        type: Number,
        required: true
    },
    validated: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    pintxopote: {
        type: ObjectId,
        ref: 'Pintxopote',
        required: true
    }
});
