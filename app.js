const express = require("express");
const app = express();
const pug = require('pug');
const mainRoutes = require('./routes/theRoutes');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("Mongodb://localhost:27017/userFeedback")

const db = mongoose.connection;

db.on("error", function(err){
	console.error("Connection error:", err);
});
db.once("open", function(){
	console.log("Conection to db was succesful");
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));

app.use(mainRoutes);


app.listen(3000, () => {
	console.log("The server has sarted on port 3000.");
});
