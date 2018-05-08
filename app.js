const express = require("express");
const app = express();
const pug = require('pug');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mainRoutes = require('./routes');
const feedbackRoutes = require('./routes/feedback');
const logger = require("morgan");
const compression = require('compression');
const helmet = require('helmet');

app.use(compression());
app.use(helmet());

mongoose.connect("Mongodb://localhost:27017/userFeedback")

const db = mongoose.connection;

app.use(session({
  secret: 'katie is the maker',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db,
  })
}));


app.use((req, res, next) => {
	res.locals.currentUser = req.session.userId;
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


db.on("error", function(err){
	console.error("Connection error:", err);
});
db.once("open", function(){
	console.log("Conection to db was succesful");
});


app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(mainRoutes);
app.use('/feedback', feedbackRoutes)



app.listen(3000, () => {
	console.log("The server has started on port 3000.");
});
