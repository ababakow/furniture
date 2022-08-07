const secret = process.env.SECRET || 'thisshouldbedettersecret';
const store = require('./mongoStore');

const sessionConfig = {
    store,
	secret,
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
};

module.exports = sessionConfig;
