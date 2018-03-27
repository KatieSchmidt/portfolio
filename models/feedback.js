const User = require('./user');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
	feedback: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
});

// FeedbackSchema.pre('save', function(next) {
// 	const feedback = this;
// 	if (err) {
// 		return next(err);
// 	} else{
// 		next();
// 	}
// });

const Feedback = mongoose.model("Feedback", FeedbackSchema);


module.exports = Feedback;
