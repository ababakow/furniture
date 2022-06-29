const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
	{
		f_name: String,
		l_name: String,
		email: {
			type: String,
			required: true,
			unique: true,
			immutable: true
		},
		phone: String,
		adress: {
			city: String,
			street: String,
			house: String,
			apt: String
		},
		birthday: {
			_id: false,
			day: Number,
			month: Number,
			year: Number
		},
		sex: {
			type: String,
			enum: [ 'M', 'F', 'n/d' ]
		},
		admin: {
			type: Boolean,
			default: false,
			required: true,
			immutable: true
		}
	},
	{ timestamps: true }
);

const passportOptions = {
	usernameQueryFields: [ 'email', 'username' ],
	limitAttempts: true,
	maxAttempts: 10,
	unlockInterval: 60 * 60 * 10,
	selectFields: 'username attempts last',
	errorMessages: {
		MissingPasswordError: 'Відсутній пароль.',
		AttemptTooSoonError: 'Акаунт заблокований, спробуйте пізніше.',
		TooManyAttemptsError:
			'Акаунт заблоковано через перевищений ліміт спроб входу. Доступ буде відновлено через 10 хвилин.',
		NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
		IncorrectPasswordError: 'Пароль або нікнейм/email некоректні.',
		IncorrectUsernameError: 'Пароль або нікнейм/email некоректні.',
		MissingUsernameError: 'Відсутній нікнейм/email',
		UserExistsError: 'Користувач з таким нікнеймом вже існує. Спробуйте підібрати інший нікнейм.'
	}
};

userSchema.plugin(passportLocalMongoose, passportOptions);

const User = mongoose.model('User', userSchema);

module.exports = User;
