const {
    Schema,
    Schema: { ObjectId }
} = require('mongoose');

const userAdress = require('./userAddress');

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: [{ type: String, enum: ['user', 'pub', 'admin'] }],
        required: true,
        default: 'user'
    },
    address: userAdress,
    orders: [
        {
            type: ObjectId,
            ref: 'Order'
        }
    ],
    creditCard: {
        type: String
    }
});
