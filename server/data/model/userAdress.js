const mongoose = require('mongoose');
const { UserAddress } = require('./schemas');

module.exports = mongoose.model('UserAdress', UserAddress);

