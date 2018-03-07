var express = require("express");
var router = express.Router();
var Project = require("../models/project");

//SHOW ROUTE FOR HOMEPAGE

router.get("/", function(res, res){	
    res.render("portfolio/index");	
});

module.exports = router;

