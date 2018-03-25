const express = require('express');
const router = express.Router();


router.get("/register", )

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
	res.render("layout", {pageHeader: "Aboout Me",
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
