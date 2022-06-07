const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tourSchema  = new Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    likes: {
        type: [String],
        default: []
    }
},{
    timestamps: true
})

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;