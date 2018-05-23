'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const FeedbackSchema = new Schema({
	feedback: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	user: String,
	userId: String,
});


const Feedback = mongoose.model("Feedback", FeedbackSchema);


module.exports = Feedback;
