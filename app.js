const express = require("express");
const app = express();


app.get("/", (req, res, next) => {
	res.send("This will be the home page.");
});



app.listen(3000, () => {
	console.log("The server has sarted on port 3000.");
});
