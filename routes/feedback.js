const express = require('express');
const router = express.Router();
const User = require('../models');
const mid = require('../middleware');

router.get("/", mid.requiresLogin, (req, res, next) => {
	User.findById(req.session.userId).exec((error, user) => {
		if (error) {
			return next(error);
		} else {
			return res.render("feedback", {pageHeader: "What do you think about my first portfolio site?", pageTitle: "Feedback"});
		}
	});
});




module.exports = router;
