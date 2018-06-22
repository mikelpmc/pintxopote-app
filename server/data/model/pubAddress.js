const mongoose = require('mongoose');
const { PubAddress } = require('./schemas/');

module.exports = mongoose.model('PubAddress', PubAddress);
