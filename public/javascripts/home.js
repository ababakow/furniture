const header = document.querySelector('header');
const nav = document.querySelector('#navbar');

nav.classList.add('nav-bg');
header.classList.remove('sticky-top');
header.classList.add('fixed-top');

window.addEventListener('scroll', (e) => {
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		if (nav.classList.contains('nav-bg')) nav.classList.remove('nav-bg');
	} else {
		if (!nav.classList.contains('nav-bg')) nav.classList.add('nav-bg');
	}
});
