var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/landing", function(req, res) {
    res.render("fluffypillows/landing");
});

// AUTH ROUTES ---

//REGISTER ROUTES

router.get("/register", function(req, res) {
    res.render("fluffypillows/register");
});

router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.render("fluffypillows/register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "You're now successfully registered on the website.");
            res.redirect("/pillows");
        });
    });
});

//LOGIN ROUTES

router.get("/login", function(req, res) {
    res.render("fluffypillows/login", { message: req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/pillows",
    failureRedirect: "/login"

}), function(req, res) {});

// LOGOUT ROUTE

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You're now logged out.")
    res.redirect("/pillows");
});

module.exports = router;