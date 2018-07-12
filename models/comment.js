'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const CommentSchema = new Schema({
	comment: String,
	createdAt: {type: Date, default: Date.now},
	updatedAt: {type: Date, default: Date.now},
	author: String,
	userId: String,
});


const Comment = mongoose.model("Comment", CommentSchema);


module.exports = Comment;