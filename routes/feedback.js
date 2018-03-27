const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');
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

router.post('/', function(req, res, next) {
	if ( req.body.feedback ) {
		let userFeedbackData = {
			feedback: req.body.feedback,
			author: User.findById(req.session.userId)
		};

		Feedback.create(userFeedbackData, (error, feedback) => {
			if (error) {
				return next(error);
			} else {
				req.session.userFeedbackId = feedback._id;
				return res.redirect('/thankyou');
			}
		})
	} else {
		var err = new Error('You need to leave feedback.');
		err.status = 400;
		return next(err);
	};
});







module.exports = router;
