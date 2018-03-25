'use strict'

const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	}
});

const UserReviewSchema = new Schema({
	username: String,
	review: String,
	dateAdded: {type: Date, default: Date.now}
});

const User = mongoose.model("User", UserSchema);

const UserReview = mongoose.model("UserReview", UserReviewSchema);



module.exports = User;
