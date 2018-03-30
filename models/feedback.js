'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
	feedback: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	author: String
});


const Feedback = mongoose.model("Feedback", FeedbackSchema);


module.exports = Feedback;
