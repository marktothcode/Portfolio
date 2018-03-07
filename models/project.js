var mongoose = require("mongoose");
var projectSchema = new mongoose.Schema({
    name: String,
    myImage: String,
    stack: String,    
    description: String,
    pimage: String,
    link: String

   });

module.exports = mongoose.model("project", projectSchema);