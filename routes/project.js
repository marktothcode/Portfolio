var express = require("express");
var router = express.Router();
var Project = require("../models/project");
//const multer = require ('multer');
//const path = require ('path');

// Set Storage Engine --- THIS PART IS NOT WORKING YET!
/*
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

function checkFileType(file, cb){
    //Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only!');
    }
} */

//SHOW ROUTE FOR ALL PROJECTS

router.get("/", function(req,res){
	Project.find({}, function(err, allProjects) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("portfolio/project-list", { projects: allProjects });
        }
    });
});

// PROJECT - CREATE ROUTE

router.post("/", function(req,res){
	var name = req.body.name;
    var stack = req.body.stack;
    var myImage = req.body.myImage;
    var description = req.body.description;   
    var pimage = req.body.pimage;
    var link = req.body.link;


    var newproject = { name: name, 
        stack: stack, 
        myImage: myImage, 
        description: description, 
        pimage: pimage, 
        link:link 
    };

    Project.create(newproject, function(err, NewlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(NewlyCreated);
            res.redirect("/project-list");
        }
    });
});

//missing upload function above, not sure how to implement...

router.get("/new", function(req, res){
	res.render("portfolio/x-new");
});

// PROJECT EDIT ROUTE

router.get("/:id/edit", function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            console.log(err);
        }
        res.render("portfolio/edit", { project: foundProject });
    });
});

//ADMIN ROUTE FOR CHANGES

router.get("/backend", function(req, res){	
	Project.find({}, function(err, allProjects) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("portfolio/backend", { projects: allProjects });   
        }
    });
});



// PROJECT UPDATE ROUTE

router.put("/:id", function(req, res) {

    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject) {
        if (err) {
            res.redirect("/project-list/");
            console.log(err);
        }
        else {
            res.redirect("/project-list/");
        }
    });
});

// PROJECT DESTROY ROUTE

router.delete("/:id", function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/backend");
        }
        else {
            res.redirect("/backend");
        }
    });
});

// SHOW INDIVIDUAL PROJECT

router.get("/:id", function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if (err) {
            console.log(err);
        }
        res.render("portfolio/individual-project", { project: foundProject });
    });
});



module.exports = router;