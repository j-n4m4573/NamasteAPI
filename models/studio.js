var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudioSchema = new Schema ({
    name : String,
    location: String,
    photo: String
})

module.exports = mongoose.model('Studio', ProductSchema)
