const mongoose = require('mongoose');

const beverage = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    procentage: Number,
    type:{
        typename: String,
        subtype: String
    },
    taste: String,
    score: Number,
    price: Number,
    apk: String,
    img: String,
    link: String,
    username: String,
    userid: String,
    timesdrunk: Number,
});

module.exports = mongoose.model('beverage', beverage);