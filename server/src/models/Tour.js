const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tourSchema  = new Schema({
    
})


const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;