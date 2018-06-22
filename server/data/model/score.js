const mongoose = require('mongoose');
const { Score } = require('./schemas/');

module.exports = mongoose.model('Score', Score);
