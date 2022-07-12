'use strict';
export function formatPhone(input) {
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
}
