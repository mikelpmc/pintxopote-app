const { Schema } = require('mongoose');

module.exports = new Schema({
    street: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postalCode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    }
});
