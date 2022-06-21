const validate = (f, item) => {
	f(item);
	item.addEventListener('input', (e) => {
		f(item);
	});
};
//--------------------------------------------------------------------------------
const validationPassword = (input) => {
	let msg = '';
	if (input.value != '') {
		if (input.value.length < 6) msg += 'Пароль має бути більше 6 символів.<br>';
		if (input.value.length > 250) msg += 'Пароль занадто великий<br>';
	}
	setValid(input, msg);
};

const validationPasswordRepeat = (input, pass) => {
	let msg = '';
	if (pass && input.value !== pass) {
		msg += 'Пароль не співпадає.<br>';
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
const formatPhone = (input) => {
	input.addEventListener('focus', (e) => {
		if (input.value.substr(0, 5) != '+38(0') input.value = '+38(0';
	});

	input.addEventListener('keydown', (e) => {
		if (!/\d/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
		if (e.key === 'Backspace') return;

		if (input.value.length === 3) {
			input.value += '(';
		}
		if (input.value.length === 7) {
			input.value += ')';
		}
		if (input.value.length === 11) {
			input.value += '-';
		}
		if (input.value.length === 14) {
			input.value += '-';
		}
	});
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
	const password = document.querySelector('#password');
	const passwordRepeat = document.querySelector('#password2');
	const phone = document.querySelector('#phone');
	const f_name = document.querySelector('#f_name');
	const l_name = document.querySelector('#l_name');
	const city = document.querySelector('#city');
	const street = document.querySelector('#street');
	const house = document.querySelector('#house');
	const apt = document.querySelector('#apt');

	formatPhone(phone);

	form.addEventListener('submit', (e) => {
		validate(validationPassword, password);
		validate(validationPhone, phone);
		validate(validationStreeng50, f_name);
		validate(validationStreeng50, l_name);
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
