const mongoose = require('mongoose');
const { Pub } = require('./schemas/');

module.exports = mongoose.model('Pub', Pub);
