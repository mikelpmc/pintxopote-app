// USER
const User = require('./User/user');
const UserAddress = require('./User/userAddress');

// ORDER
const Order = require('./Order/order');

// Pintxopote
const Pintxopote = require('./Pintxopote/pintxopote');
const Score = require('./Pintxopote/score');

// Pub
const Pub = require('./Pub/pub');
const PubAddress = require('./Pub/pubAddress');

module.exports = {
    User,
    UserAddress,
    Order,
    Pintxopote,
    Score,
    Pub,
    PubAddress
};
