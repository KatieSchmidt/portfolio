const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Feedback = require('../models/feedback');
const mid = require('../middleware');



router.get("/", (req, res, next) => {
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
	if ( req.body.feedback ) {
		User.findById(req.session.userId).exec(function(error, user){
			if (error){
				return next(error);
			} else {
				const userFeedbackData = {
					feedback: req.body.feedback,
					user: user.name,
					userId: req.session.userId,
				};

				Feedback.create(userFeedbackData, function(error, feedback) {
					if (error) {
						return next(error);
					} else {
						return res.redirect('/feedback');
					};
				});
			}
		});
	} else {
		var err = new Error('You need to leave feedback');
		err.status = 400;
		return next(err);
	};
});


router.get("/:id", (req, res, next) => {
	Feedback.deleteOne({_id: req.params.id}, (error) => {
		if (error) {
			return next(error);
		} else {
			res.redirect('/feedback');
		};
	});
});

router.get("/edit/:id", (req, res, next) => {
	Feedback.findOne({_id: req.params.id}, (error, feedback) => {
		res.render('editFeedback', {feedback: feedback});
	});
});

router.post('/update/:id', function (req, res) {
  Feedback.findById(req.params.id, function(err, feedback) {
    if (!feedback)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
			if (req.body.feedback){
				feedback.feedback = req.body.feedback;
			} else {
				feedback.feedback = feedback.feedback;
			}


      feedback.save().then(feedback => {
          res.redirect('/feedback');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});




module.exports = router;
