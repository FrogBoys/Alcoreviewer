const mongoose = require('mongoose');

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    hash: String,
    username: String,   
    salt: String,
    type: String
});

module.exports = mongoose.model('user', User);