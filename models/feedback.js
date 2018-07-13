'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Comment = require("./comment");

const FeedbackSchema = new Schema({
	feedback: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	userId: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);


module.exports = Feedback;
