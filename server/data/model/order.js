const mongoose = require('mongoose');
const { Order } = require('./schemas/');

module.exports = mongoose.model('Order', Order);
