const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');

const path = require('path');
////////////////////////////////////////////////////
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//-------------------------------------------------
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
app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/contacts', (req, res) => {
	res.render('contacts');
});

app.all('*', (req, res) => {
	res.send('404 404 404');
});
////////////////////////////////////////////////////
app.listen(3000, () => {
	console.log('listerning port 3000...');
});
