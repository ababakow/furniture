const mongose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongose.Schema(
	{
		f_name: String,
		l_name: String,
		email: {
			type: String,
			required: true,
			unique: true
		},
		phone: String,
		adress: {
			city: String,
			street: String,
			house: String,
			apt: String
		},
		admin: {
			type: Boolean,
			default: false,
			required: true
		}
	},
	{ timestamps: true }
);

const passportOptions = {
	usernameQueryFields: [ 'email', 'username' ],
	limitAttempts: true,
	maxAttempts: 10,
	unlockInterval: 60 * 60 * 10,
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

const Users = mongose.model('Users', userSchema);

module.exports = Users;
