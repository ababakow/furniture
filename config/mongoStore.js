const MongoStore = require('connect-mongo');
const dbUrl = require('./dbUrl');
const secret = process.env.SECRET || 'thisshouldbedettersecret';

const store = MongoStore.create({
	mongoUrl: dbUrl,
	crypto: {
		secret: secret
	},
	touchAfter: 24 * 60 * 60
});

module.exports = store;