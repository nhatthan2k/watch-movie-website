const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    englishName: {
        type: String,
        require: true
    },
    genres: {
        type: [String],
    },
    imageUrl: {
        type: String,
        slug: 'name'
    },
    showDate: {
        type: [String],
    },
    updateStatus: {
        type: String
    }
})

module.exports = mongoose.model("movie", movieSchema)