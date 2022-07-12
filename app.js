if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const catalogRoutes = require('./routes/catalog');
const shopRoutes = require('./routes/shop');
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const statusRoutes = require('./routes/status');
const actionRoutes = require('./routes/action');

const User = require('./models/user');

const AppError = require('./utils/appError');

const path = require('path');
////////////////////////////////////////////////////
const dbUrl = 'mongodb://localhost:27017/furniture';
mongoose
	.connect(dbUrl)
	.then(() => {
		console.log('DB connected!');
	})
	.catch((err) => {
		console.log(err);
	});
//-------------------------------------------------
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//-------------------------------------------------

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));

const sessionConfig = {
	secret: 'firsttimesecret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});
app.use((req, res, next) => {
	req.session.preUrl = req.session.curUrl;
	req.session.curUrl = req.originalUrl;
	next();
});
////////////////////////////////////////////////////
//==============================================
app.use('/catalog', catalogRoutes);
app.use('/shop', shopRoutes);
app.use('/actions', actionRoutes);
app.use('/orders', orderRoutes);
app.use('/orders/:id/status', statusRoutes);
app.use('/', mainRoutes);
app.use('/', userRoutes);
//==============================================

app.all('*', (req, res, next) => {
	next(new AppError('Такої сторінки не існує', 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = 'Щось пійшло не так :(';
	res.status(statusCode).render('error', { err });
});
////////////////////////////////////////////////////
app.listen(3000, () => {
	console.log('listerning port 3000...');
});
