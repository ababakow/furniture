if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const mailer = require('./nodemailer/nodemailer');

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

app.get('/', (req, res) => {
	res.render('home');
});
//==============================================
app.get('/catalog', (req, res) => {
	res.render('catalog');
});

app.get('/catalog/new', (req, res) => {
	res.render('catalog/new');
});

app.post('/catalog', (req, res) => {
	res.redirect('/catalog');
});

app.get('/catalog/:category', (req, res) => {
	const { category } = req.params;
	res.render('catalog/category', { category });
});

app.get('/catalog/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.render('catalog/show', { category, id });
});

app.get('/catalog/:category/:id/edit', (req, res) => {
	res.render('catalog/edit');
});

app.put('/catalog/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.redirect(`/catalog/${category}/${id}`);
});

app.delete('/catalog/:category/:id', (req, res) => {
	res.redirect('/catalog');
});
//==============================================
app.get('/shop', (req, res) => {
	res.render('shop');
});
app.get('/shop/new', (req, res) => {
	res.render('shop/new');
});
app.post('/shop', (req, res) => {
	res.redirect('/shop');
});
app.get('/shop/:category', (req, res) => {
	const { category } = req.params;
	res.render(`shop/${category}`);
});
app.get('/shop/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.render('shop/show', { category, id });
});

app.get('/shop/:category/:id/edit', (req, res) => {
	res.render('shop/edit');
});

app.put('/shop/:category/:id', (req, res) => {
	const { category, id } = req.params;
	res.redirect(`/shop/${category}/${id}`);
});

app.delete('/shop/:category/:id', (req, res) => {
	res.redirect('/shop');
});
//==============================================
app.get('/actions', (req, res) => {
	res.render('actions');
});

app.get('/contacts', (req, res) => {
	res.render('contacts');
});
app.post('/contacts', (req, res) => {
	mailer.mailer(req.body);
	res.render('contacts');
});

app.all('*', (req, res) => {
	res.send('404 404 404');
});
////////////////////////////////////////////////////
app.listen(3000, () => {
	console.log('listerning port 3000...');
});
