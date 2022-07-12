import { formatPhone } from './modules/formatPhone.mjs';

('use strict');
const callBackPhone = document.querySelector('#callBackPhone');
const phone = document.querySelector('#phone');
const callRequestBtn = document.querySelector('#call-request-btn');

formatPhone(callBackPhone);
formatPhone(phone);

callRequestBtn.addEventListener('click', () => {
	setTimeout(() => callBackPhone.focus(), 500);
});
