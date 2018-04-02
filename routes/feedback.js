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
				Feedback.find((err, feedback)=>{
					if (err) return console.error(err);
					res.render('feedback', {feedbackData: feedback,
					pageHeader: "What do you think about my first portfolio site?", pageTitle: "Feedback"});
				});
		}
	});
});

router.post('/', mid.requiresLogin, function(req, res, next) {

	if ( req.body.feedback && req.body.name ) {

		const userFeedbackData = {
			feedback: req.body.feedback,
			user: req.body.name
		};

		Feedback.create(userFeedbackData, function(error, feedback) {
			if (error) {
				return next(error);
			} else {
				return res.redirect('/thankyou');
			};
		});
	} else {
		var err = new Error('You need to leave feedback');
		err.status = 400;
		return next(err);
	};
});





module.exports = router;
