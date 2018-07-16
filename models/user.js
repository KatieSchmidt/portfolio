'use strict'

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const Feedback = require("./feedback");

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
	},
	feedbacks: [{
		type: Schema.Types.ObjectId,
		ref: 'Feedback',
	}],
});

UserSchema.statics.authenticate = (email, password, callback) => {
	User.findOne({email: email}).exec((error, user) => {
		if (error) {
			return callback(error);
		} else if ( !user ) {
			let err = new Error('User not found');
			err.status = 401;
			return callback(err);
		} else {
			bcrypt.compare(password, user.password, (error, result) => {
				if (result === true){
					return callback(null, user);
				} else {
					return callback();
				}
			})
		}
	})
}

UserSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(user.password, 10, function(err, hash){
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	})
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
