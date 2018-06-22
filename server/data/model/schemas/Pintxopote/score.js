const { Schema } = require('mongoose');

module.exports = new Schema({
    likes: {
        type: Number,
        required: false
    },
    dislikes: {
        type: Number,
        required: false
    }
});
