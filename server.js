var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Project = require("./models/project");
//var fileUpload = require("express-fileupload");
//var fs = require("fs");
//var multer = require("multer");
//var path = require("path");

// REQUIRING PORTFOLIO ROUTES

var portfolioLandingRoutes = require("./routes/portfolioLanding"),
 	projectRoutes = require("./routes/project");

// Set Storage Engine

/* const storage = multer.diskStorage({
    destination: './Public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//INIT UPLOAD

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000, },
    fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        }    
}).single('myImage'); */

mongoose.connect("mongodb://localhost/portfolio")
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));
app.use(methodOverride("_method"));
//app.use(fileUpload());

app.use(portfolioLandingRoutes);
app.use("/project-list", projectRoutes)


app.listen(8080, 'localhost');  