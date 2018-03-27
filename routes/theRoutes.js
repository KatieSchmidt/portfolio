const express = require('express');
const router = express.Router();
const User = require('../models');
const mid = require('../middleware');

router.get("/register", mid.loggedOut, (req, res, next) => {
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
					req.session.userId = user._id;
          return res.redirect('/feedback');
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
	pageTitle: "Home"});
});

router.get("/login", mid.loggedOut, (req, res, next) => {
	return res.render('login', {title: "Login"});
});

router.post('/login', function(req, res, next){
  if (req.body.email &&
  req.body.password){
    User.authenticate(req.body.email, req.body.password, function(err, user){
      if (err || !user) {
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('Password and email required to login.');
    err.status = 401;
    return next(err);
  }
});

router.get("/logout", (req, res, next) => {
	if (req.session) {
		req.session.destroy( (err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/');
			}
		})
	}
})

router.get("/feedback", mid.loggedOut, (req, res, next) => {
	User.findById(req.session.userId).exec((error, user) => {
		if (error) {
			return next(error);
		} else {
			return res.render("feedback", {pageHeader: "What do you think about my first portfolio site?", pageTitle: "Feedback"});
		}
	});
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
