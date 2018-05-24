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
const db = mongoose.connection;

app.use(compression());
app.use(helmet());

mongoose.connect("mongodb://database:27017/testdb");

db.once('open', () => console.log('Good to go!')).on('error', (error) => {
 console.warn('Warning', error);
 });

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
