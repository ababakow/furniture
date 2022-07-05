(() => {
	const goToUp = document.querySelector('#goToUp');

	window.addEventListener('scroll', (e) => {
		if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
			goToUp.style.display = 'block';
		} else {
			goToUp.style.display = 'none';
		}
	});

	goToUp.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
})();
