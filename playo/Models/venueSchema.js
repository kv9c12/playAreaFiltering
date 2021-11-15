const mongoose = require('mongoose');

exports.venueSchema = new mongoose.Schema({
    _id: String,
    cityCode: Number,
    description: String,
    ratingCount: Number,
    avgRating: Number,
    address: String,
    id: String,
    category: Number,
    city: String,
    name: String,
    area: String,
    country: String,
    sports: [{
        type: String
    }],
    state: String,
    amenities: [{
        type: String
    }]
});