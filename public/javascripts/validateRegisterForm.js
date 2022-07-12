import { formatPhone } from './modules/formatPhone.mjs';

const validate = (f, item) => {
	f(item);
	item.addEventListener('input', (e) => {
		f(item);
	});
};
//--------------------------------------------------------------------------------
const validationUsername = (input) => {
	let msg = '';
	if (input.value === '') {
		msg += 'Це поле має бути заповнене.<br>';
	} else {
		if (input.value.length < 3) msg += 'Нікнейм не може бути коротший за 3 символи.<br>';
		if (input.value.length > 250) msg += 'Нікнейм занадто великий.<br>';
		if (!/^[a-zA-Z0-9]+$/.test(input.value)) msg += 'Використовуйте латинські символи (A-z) та цифри (0-9).<br>';
	}

	setValid(input, msg);
};

const validationPassword = (input) => {
	let msg = '';
	if (input.value === '') {
		msg += 'Це поле має бути заповнене.<br>';
	} else {
		if (input.value.length < 6) msg += 'Пароль має бути більше 6 символів.<br>';
		if (input.value.length > 250) msg += 'Пароль занадто великий<br>';
	}

	setValid(input, msg);
};

const validationPasswordRepeat = (input, pass) => {
	let msg = '';
	if (input.value === '') {
		msg += 'Це поле має бути заповнене.<br>';
	} else {
		if (input.value !== pass) msg += 'Пароль не співпадає.<br>';
	}
	setValid(input, msg);
};

const validationEmail = (input) => {
	let msg = '';
	const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	if (input.value === '') {
		msg += 'Це поле має бути заповнене.<br>';
	} else {
		if (input.value.length > 250) msg += 'Email занадто великий.<br>';
		if (!re.test(input.value)) msg += 'Невірний формат email.<br>';
	}
	setValid(input, msg);
};

const validationPhone = (input) => {
	let msg = '';
	if (input.value != '') {
		if (input.value.length !== 17 && input.value != '+38(0') msg += 'Номер телефону вказаний не вірно.<br>';
	}
	setValid(input, msg);
};

const validationBirthday = (input) => {
	let msg = '';
	const day = document.querySelector('#day');
	const month = document.querySelector('#month');
	const year = document.querySelector('#year');
	console.log(day.value);

	if (day.value != '') {
		if (day.value < 1 || day.value > 31 || !+day.value) msg += 'Вкажіть день в діапазоні 1-31.<br>';
		if (day.value > 30 && (month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11))
			msg += 'У вказаному місяці 30 днів. Виправте дату або місяць.<br>';
		if (year.value == '' || (year.value != '' && year.value % 4 == 0)) {
			if (day.value > 29 && month.value == 2)
				msg += 'У вказаному місяці максимум 29 днів. Виправте дату або місяць.<br>';
		}
		if (year.value != '' && year.value % 4 != 0) {
			if (day.value > 28 && month.value == 2) msg += 'У вказаному місяці 28 днів. Виправте дату або місяць.<br>';
		}
	}
	if (month.value != '') {
		if (month.value < 1 || month.value > 12 || !+month.value) msg += 'Вкажіть місяць в діапазоні 1-12.<br>';
	}
	if (year.value != '') {
		if (year.value < 1920 || year.value > 2100 || !+year.value) msg += 'Некоректно вказаний рік.<br>';
	}
	setValid(input, msg);
};

const validationStreeng50 = (input) => {
	let msg = '';
	if (input.value != '') {
		if (input.value.length > 50) msg += 'Значення занадто велике.<br>';
	}
	setValid(input, msg);
};

const validationStreeng10 = (input) => {
	let msg = '';
	if (input.value != '') {
		if (input.value.length > 10) msg += 'Значення занадто велике.<br>';
	}
	setValid(input, msg);
};
//--------------------------------------------------------------------------------
const setValid = (input, status) => {
	if (!status) {
		if (!input.classList.contains('is-valid')) input.classList.add('is-valid');
		if (input.classList.contains('is-invalid')) input.classList.remove('is-invalid');
	} else {
		if (input.classList.contains('is-valid')) input.classList.remove('is-valid');
		if (!input.classList.contains('is-invalid')) input.classList.add('is-invalid');
	}
	input.nextElementSibling.innerHTML = status;
};
//================================================================================
(() => {
	'use strict';

	const form = document.querySelector('.register-validation');
	const username = document.querySelector('#username');
	const password = document.querySelector('#password');
	const passwordRepeat = document.querySelector('#password2');
	const email = document.querySelector('#email');
	const phone = document.querySelector('#phone');
	const f_name = document.querySelector('#f_name');
	const l_name = document.querySelector('#l_name');
	const city = document.querySelector('#city');
	const street = document.querySelector('#street');
	const house = document.querySelector('#house');
	const apt = document.querySelector('#apt');
	const birthday = document.querySelector('#birthday');

	formatPhone(phone);

	form.addEventListener('submit', (e) => {
		validate(validationUsername, username);
		validate(validationPassword, password);
		validate(validationEmail, email);
		validate(validationPhone, phone);
		validate(validationStreeng50, f_name);
		validate(validationStreeng50, l_name);
		validate(validationBirthday, birthday);
		validate(validationStreeng50, city);
		validate(validationStreeng50, street);
		validate(validationStreeng10, house);
		validate(validationStreeng10, apt);

		validationPasswordRepeat(passwordRepeat, password.value);
		passwordRepeat.addEventListener('input', (e) => {
			validationPasswordRepeat(passwordRepeat, password.value);
		});

		if (document.querySelector('.is-invalid')) e.preventDefault();
	});
})();
