const mongoose = require('mongoose');

const beverage = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    procentage: Number,
    type: String,
    taste: String,
    score: Number,
    price: Number,
    img: String,
   
});

module.exports = mongoose.model('beverage', beverage);