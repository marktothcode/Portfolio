var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var Project = require("./models/project");
var Pillow = require("./models/pillow");
var Comment = require("./models/comment");
var User = require("./models/user");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var favicon = require('serve-favicon');

//var fileUpload = require("express-fileupload");
//var fs = require("fs");
var multer = require("multer");
var path = require("path");

// REQUIRING PORTFOLIO ROUTES

var portfolioLandingRoutes = require("./routes/portfolioLanding"),
 	projectRoutes = require("./routes/project");

// REQUIRING PILLOWS ROUTES
	
var commentRoutes = require("./routes/comments"),
    pillowRoutes = require("./routes/pillows"),
    indexRoutes = require("./routes/index");

// Set Storage Egine

const storage = multer.diskStorage({
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
}).single('myImage');

mongoose.connect("mongodb://localhost/portfolio")
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));
app.use(methodOverride("_method"));
app.use(flash());
//app.use(fileUpload());

app.use(require("express-session")({
    secret: "Such a fine secret you have here!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(portfolioLandingRoutes);
app.use("/project-list", projectRoutes)
app.use(indexRoutes);
app.use("/pillows/:id/comments", commentRoutes);
app.use("/pillows", pillowRoutes);

app.listen(80, '159.65.53.136');
  