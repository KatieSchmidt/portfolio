'use strict'

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userFeedback");
const db = mongoose.connection;

db.on("error", function(err){
	console.error("Connection error:", err);
});
db.once("open", function(){
	console.log("Conection to db was succesful");

	const Schema = mongoose.Schema;

	const UserSchema = new Schema({
		name: String,//the name you get from textbox.,
		review: String,//comes from a textbox
		dateAdded: {type: Date, default: Date.now} //comes as new when you submit it.
	});

	const User = mongoose.model("User", UserSchema);

	let mary = new User({
		name: "mary",//the name you get from textbox.,
		review: "Good Job!",//comes from a textbox
	});

	mary.save(function(err){
		if (err) console.error("Save Failed", err);
		else console.log("Saved!");
		db.close(function(){
			console.log("db connection closed.");
		});
	});

});



// what entities am I tracking and
// users -
//       names,
//         reviews,
//           date added,
//


// how are they related?
