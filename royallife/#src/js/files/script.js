AOS.init({
	// Global settings:
	disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
	startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
	initClassName: 'aos-init', // class applied after initialization
	animatedClassName: 'aos-animate', // class applied on animation
	useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
	disableMutationObserver: false, // disables automatic mutations' detections (advanced)
	debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
	throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


	// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
	// offset: 500, // offset (in px) from the original trigger point
	delay: 0, // values from 0 to 3000, with step 50ms
	duration: 1200, // values from 0 to 3000, with step 50ms
	easing: 'ease', // default easing for AOS animations
	once: true, // whether animation should happen only once - while scrolling down
	mirror: false, // whether elements should animate out while scrolling past them
	anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

//Menu
const menu = document.querySelector('.menu__body');
const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');

if (menu) {
	menu.addEventListener('click', (e) => {
		if (e.target.classList.contains('menu__btn')) {
			menuList.classList.toggle('_active');
		}
	})
	document.addEventListener('click', (e) => {
		if (menuList.classList.contains('_active') && !e.target.classList.contains('menu__list') && !e.target.classList.contains('menu__btn')) {
			menuList.classList.remove('_active');
		}
	});
}


/* Testimonial-more */
const testimonials = document.querySelector('.testimonials');
const testimonialsText = document.querySelector('.testimonials__text');
const moreBtns = document.querySelectorAll('.testimonials__btn-more');

if (moreBtns && moreBtns.length > 0) {
	testimonials.addEventListener('click', e => {
		if (e.target.classList.contains('testimonials__btn-more')) {
			e.target.closest('.testimonials__content ').querySelector('.testimonials__text').classList.toggle('_active');
			if (e.target.classList.contains('_active')) {
				console.log(1);
				e.target.textContent = 'Подробнее';
				e.target.classList.remove('_active');
			} else {
				e.target.classList.add('_active');
				e.target.textContent = 'Свернуть';
			}
			e.preventDefault();

		}
	});
}

