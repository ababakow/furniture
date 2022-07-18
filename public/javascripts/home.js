const header = document.querySelector('header');

header.children[0].classList.add('nav-bg');
header.classList.remove('sticky-top');
header.classList.add('fixed-top');

window.addEventListener('scroll', (e) => {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		if (header.children[0].classList.contains('nav-bg')) header.children[0].classList.remove('nav-bg');
	} else {
		if (!header.children[0].classList.contains('nav-bg')) header.children[0].classList.add('nav-bg');
	}
});
