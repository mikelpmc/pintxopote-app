const { Schema } = require('mongoose');

module.exports = new Schema({
    street: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false //TODO: TRUE
    },
    postalCode: {
        type: String,
        required: false
    },
    lat: {
        type: String,
        required: false
    },
    long: {
        type: String,
        required: false
    }
});
