const mongoose = require('mongoose');
const { Pintxopote } = require('./schemas/');

module.exports = mongoose.model('Pintxopote', Pintxopote);
