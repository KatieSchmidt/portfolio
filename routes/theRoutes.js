const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("layout", {pageHeader: "This is the HomePage",
	pageTitle: "Home", contentHeader: "Content header Placeholder", contentParagraph: "Content Placeholder" });
});

router.get("/login", (req, res) => {
	const name = req.cookies.username;
	if (name){
		res.redirect('/feedback');
	} else {
		res.render("login");
	}
});

router.post("/login", (req, res) => {
	res.cookie('username', req.body.username);
	res.redirect('/feedback');
});


router.get("/feedback", (req, res, next) => {
	res.render("feedback");
});

router.get("/about", (req, res, next) => {
	res.render("layout", {pageHeader: "Aboout Me",
	pageTitle: "About", contentHeader: "Contentheader PlaceHolder", contentParagraph: "Content Placeholder"});
});

router.get("/contact", (req, res, next) => {
	res.render("layout", {pageHeader: "How to get ahold of 'Lil Mama'.",
	pageTitle: "Contact", contentHeader: "Contentheader Placeholder", contentParagraph: "Content Placeholder"});
});

router.get("/projects", (req, res, next) => {
	res.render("layout", {pageHeader: "My Projects",
	pageTitle: "Projects", contentHeader: "Contentheader Placeholder", contentParagraph: "Content Placeholder"});
});


module.exports = router;
