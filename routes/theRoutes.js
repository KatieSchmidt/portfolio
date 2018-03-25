const express = require('express');
const router = express.Router();
var User = require('../models');

router.get("/register", (req, res, next) => {
	res.render("register", {pageTitle: 'Register', pageHeader: "Register here if you want to leave some feedback."})
});

router.post('/register', function(req, res, next) {
if (req.body.email &&
	req.body.name &&
	req.body.password &&
	req.body.confirmPassword) {
		if (req.body.password !== req.body.confirmPassword){
			var err = new Error('Passwords dont match!');
			err.status = 400;
			return next(err);
		} else {
			var userData = {
				email: req.body.email,
				name: req.body.name,
				password: req.body.password
			};

			User.create(userData, function(error, user) {
        if (error){
          return next(error);
        } else {
          return res.redirect('/profile');
        };
      });
		};
	} else {
		var err = new Error('All fields are required');
		err.status = 400;
		return next(err);
	};
});

router.get("/", (req, res, next) => {
	res.cookie('username', req.body.username);
	res.render("layout", {pageHeader: "This is the HomePage",
	pageTitle: "Home" });
});

router.get("/login", (req, res) => {
	res.render('login')
});

router.post("/login", (req, res) => {
	res.redirect("/feedback")
});


router.get("/feedback", (req, res, next) => {
	res.cookie('username', req.body.username);
	res.render("feedback", {pageHeader: "What do you think about my first portfolio site?", pageTitle: "Feedback"});
});

router.post("/feedback", (req, res) => {
	res.redirect('/thankyou')
});

router.get("/thankyou", (req, res) => {
	res.render("thankyou", {pageHeader: "FeedBack received!", pageTitle: "Thank you"})
})

router.get("/about", (req, res, next) => {
	res.cookie('username', req.body.username);
	res.render("layout", {pageHeader: "About Me",
	pageTitle: "About"});
});

router.get("/contact", (req, res, next) => {
	res.cookie('username', req.body.username);
	res.render("layout", {pageHeader: "How to get ahold of 'Lil Mama'.", pageTitle: "Contact"});
});

router.get("/projects", (req, res, next) => {
	res.cookie('username', req.body.username);
	res.render("layout", {pageHeader: "My Projects", pageTitle: "Projects"});
});




module.exports = router;
