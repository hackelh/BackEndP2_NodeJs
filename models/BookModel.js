const mongoose = require('mongoose');

const bookShema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    userId: { type: String, required: true },
    imageUrl: { type: String, required: true},
    year: { type: Number, required: true },
    genre: { type: String, required: true },

    rattings: [{

        userId: { type: String },
        ratting: { type: Number},
        reviewerName: { type: String, required: true }
    }
],
averageRating: { type: Number },
});
module.exports = mongoose.model('Book', bookShema);