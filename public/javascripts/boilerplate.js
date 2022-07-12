import { formatPhone } from './modules/formatPhone.mjs';

formatPhone(document.querySelector('#nav-callBackPhone'));

listenGoToUpBtn();

function listenGoToUpBtn() {
	const goToUp = document.querySelector('#goToUp');

	window.addEventListener('scroll', (e) => {
		if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
			goToUp.style.display = 'block';
		} else {
			goToUp.style.display = 'none';
		}
	});

	goToUp.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
}
