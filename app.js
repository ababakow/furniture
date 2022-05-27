if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const mailer = require('./nodemailer/nodemailer');

const catalogRoutes = require('./routes/catalog');
const shopRoutes = require('./routes/shop');
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

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
//app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
////////////////////////////////////////////////////

//==============================================
app.use('/catalog', catalogRoutes);
app.use('/shop', shopRoutes);
app.use('/', mainRoutes);
app.use('/', userRoutes);
//==============================================

app.all('*', (req, res) => {
	res.send('404 404 404');
});
////////////////////////////////////////////////////
app.listen(3000, () => {
	console.log('listerning port 3000...');
});
