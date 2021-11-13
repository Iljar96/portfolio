function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
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


//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}


function sliders_bild_callback(params) { }

let slider_intro = new Swiper('.intro__slider', {
	effect: 'fade',
	/*
	
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	lazy: true,
	parallax: true,
	pagination: {
		el: ".swiper-pagination",
		type: "progressbar",
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>' +
				' из ' +
				'<span class="' + totalClass + '"></span>';
		},
	},
	// Arrows
	navigation: {
		nextEl: '.intro__item_next',
		prevEl: '.intro__item_prev',
	},
	// on: {

	// },
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

const currentSlideIndex = document.querySelector('.slides__current');
const slidesAll = document.querySelector('.slides__all');
const slidesLength = document.querySelectorAll('.intro__slide').length;

const getSlidesCount = () => {
	if (slidesLength > 0) {
		slidesAll.textContent = ('0' + slidesLength).slice(-2);
	}
}

getSlidesCount()

slider_intro.on('slideChange', function () {
	currentSlideIndex.textContent = (`0` + (this.activeIndex + 1)).slice(-2);
});


let slider_complex = new Swiper('._complex-slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	// Arrows
	navigation: {
		nextEl: '.complex__item.next-slider',
		prevEl: '.complex__item.prev-slider',
	},
	breakpoints: {
		550: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 65,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});


let slider_bottom = new Swiper('._bottom-slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	//lazy: true,
	// Arrows
	navigation: {
		prevEl: '.bottom__item--prev',
		nextEl: '.bottom__item--next',
	},
	breakpoints: {
		550: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 2,
			spaceBetween: 65,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});


let slider_testimonials = new Swiper('.testimonials__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 60,
	speed: 800,
	loop: true,
	//lazy: true,
	// Arrows
	navigation: {
		prevEl: '.testimonials__item--prev',
		nextEl: '.testimonials__item--next',
	},
	breakpoints: {
		768: {
			slidesPerView: 2,
			spaceBetween: 0,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 58,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

const buildingSliderLength = document.querySelectorAll('.complex--building').length;
for (let i = 1; i < buildingSliderLength + 1; i++) {
	initComplexSlider(i);
	console.log(i);
}
function initComplexSlider(i) {
	new Swiper(`._building-slider-${i}`, {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 800,
		lazy: true,
		loop: true,
		// Arrows
		navigation: {
			nextEl: `._${i}.complex__item.next-slider`,
			prevEl: `._${i}.complex__item.prev-slider`,
		},
		breakpoints: {
			550: {
				slidesPerView: 2,
				spaceBetween: 10,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1441: {
				slidesPerView: 3,
				spaceBetween: 45,
			},
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}


// let slider_building1 = new Swiper('._building-slider-1', {
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	speed: 800,
// 	lazy: true,
// 	loop: true,
// 	// Arrows
// 	navigation: {
// 		nextEl: '._1.complex__item.next-slider',
// 		prevEl: '._1.complex__item.prev-slider',
// 	},
// 	breakpoints: {
// 		550: {
// 			slidesPerView: 2,
// 			spaceBetween: 10,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1441: {
// 			slidesPerView: 3,
// 			spaceBetween: 45,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	}
// });
// let slider_building2 = new Swiper('._building-slider-2', {
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	speed: 800,
// 	lazy: true,
// 	loop: true,
// 	// Arrows
// 	navigation: {
// 		nextEl: '._2.complex__item.next-slider',
// 		prevEl: '._2.complex__item.prev-slider',
// 	},
// 	breakpoints: {
// 		550: {
// 			slidesPerView: 2,
// 			spaceBetween: 10,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1441: {
// 			slidesPerView: 3,
// 			spaceBetween: 45,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	}
// });

// let slider_building3 = new Swiper('._building-slider-3', {
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	speed: 800,
// 	lazy: true,
// 	loop: true,
// 	// Arrows
// 	navigation: {
// 		nextEl: '._3.complex__item.next-slider',
// 		prevEl: '._3.complex__item.prev-slider',
// 	},
// 	breakpoints: {
// 		550: {
// 			slidesPerView: 2,
// 			spaceBetween: 10,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1441: {
// 			slidesPerView: 3,
// 			spaceBetween: 45,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	}
// });

// let slider_building4 = new Swiper('._building-slider-4', {
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	speed: 800,
// 	lazy: true,
// 	loop: true,
// 	// Arrows
// 	navigation: {
// 		nextEl: '._4.complex__item.next-slider',
// 		prevEl: '._4.complex__item.prev-slider',
// 	},
// 	breakpoints: {
// 		550: {
// 			slidesPerView: 2,
// 			spaceBetween: 10,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1441: {
// 			slidesPerView: 3,
// 			spaceBetween: 45,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	}
// });

// let slider_building5 = new Swiper('._building-slider-5', {
// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	speed: 800,
// 	lazy: true,
// 	loop: true,
// 	// Arrows
// 	navigation: {
// 		nextEl: '._5.complex__item.next-slider',
// 		prevEl: '._5.complex__item.prev-slider',
// 	},
// 	breakpoints: {
// 		550: {
// 			slidesPerView: 2,
// 			spaceBetween: 10,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1441: {
// 			slidesPerView: 3,
// 			spaceBetween: 45,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	}
// });

let slider_building_scheme = new Swiper('._building-slider-scheme', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	// autoHeight: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._scheme.complex__item.next-slider',
		prevEl: '._scheme.complex__item.prev-slider',
	},
	breakpoints: {
		550: {
			slidesPerView: 2,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1441: {
			slidesPerView: 4,
			spaceBetween: 45,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

//=================
//Remove _hidden
setTimeout(function () {
	document.querySelectorAll('._hidden').forEach((el) => {
		el.classList.remove('_hidden');
	});
	document.querySelectorAll('._hidden-768').forEach((el) => {
		el.classList.remove('_hidden-768');
	});
}, 1000);

let unlock = true;

//=================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}
//=================
//Menu
let iconMenu = document.querySelector(".icon-menu");
let headerLogo = document.querySelector(".menu__logo");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
			headerLogo.classList.toggle("_gold");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
	headerLogo.classList.remove("_gold");
}
//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				// el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
let lock_padding = document.querySelectorAll("._lp");
for (let index = 0; index < lock_padding.length; index++) {
	const el = lock_padding[index];
	el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			// el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
	gallery_init();
}
function gallery_init() {
	for (let index = 0; index < gallery.length; index++) {
		const el = gallery[index];
		lightGallery(el, {
			counter: true,
			selector: 'a',
			download: false,
			zoom: true,
			enableTouch: true
		});
	}
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================
//RemoveClasses
function _removeClasses(el, class_name) {
	for (var i = 0; i < el.length; i++) {
		el[i].classList.remove(class_name);
	}
}
//========================================
//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
//Animate
function animate({ timing, draw, duration }) {
	let start = performance.now();
	requestAnimationFrame(function animate(time) {
		// timeFraction изменяется от 0 до 1
		let timeFraction = (time - start) / duration;
		if (timeFraction > 1) timeFraction = 1;

		// вычисление текущего состояния анимации
		let progress = timing(timeFraction);

		draw(progress); // отрисовать её

		if (timeFraction < 1) {
			requestAnimationFrame(animate);
		}

	});
}
function makeEaseOut(timing) {
	return function (timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function makeEaseInOut(timing) {
	return function (timeFraction) {
		if (timeFraction < .5)
			return timing(2 * timeFraction) / 2;
		else
			return (2 - timing(2 * (1 - timeFraction))) / 2;
	}
}
function quad(timeFraction) {
	return Math.pow(timeFraction, 2)
}
function circ(timeFraction) {
	return 1 - Math.sin(Math.acos(timeFraction));
}
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
(function () {
	// проверяем поддержку
	if (!Element.prototype.closest) {
		// реализуем
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	// проверяем поддержку
	if (!Element.prototype.matches) {
		// определяем свойство
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
let scr_body = document.querySelector('body');
let scr_blocks = document.querySelectorAll('._scr-sector');
let scr_items = document.querySelectorAll('._scr-item');
let scr_fix_block = document.querySelectorAll('._side-wrapper');
let scr_min_height = 750;

let scrolling = true;
let scrolling_full = true;

let scrollDirection = 0;

let currentScroll;

//ScrollOnScroll
window.addEventListener('scroll', scroll_scroll);
function scroll_scroll() {
	let src_value = currentScroll = pageYOffset;
	let header = document.querySelector('header.header');
	if (header !== null) {
		if (src_value > 10) {
			header.classList.add('_scroll');
		} else {
			header.classList.remove('_scroll');
		}
	}
	if (scr_blocks.length > 0) {
		for (let index = 0; index < scr_blocks.length; index++) {
			let block = scr_blocks[index];
			let block_offset = offset(block).top;
			let block_height = block.offsetHeight;

			/*
			if ((src_value > block_offset - block_height) && src_value < (block_offset + block_height) && window.innerHeight > scr_min_height && window.innerWidth > 992) {
				let scrProcent = (src_value - block_offset) / block_height * 100;
				scrParallax(block, scrProcent, block_height);
			}
			*/

			if ((pageYOffset > block_offset - window.innerHeight / 1.5) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				block.classList.add('_scr-sector_active');
			} else {
				if (block.classList.contains('_scr-sector_active')) {
					block.classList.remove('_scr-sector_active');
				}
			}
			if ((pageYOffset > block_offset - window.innerHeight / 2) && pageYOffset < (block_offset + block_height) - window.innerHeight / 5) {
				if (!block.classList.contains('_scr-sector_current')) {
					block.classList.add('_scr-sector_current');
				}
			} else {
				if (block.classList.contains('_scr-sector_current')) {
					block.classList.remove('_scr-sector_current');
				}
			}
		}
	}
	if (scr_items.length > 0) {
		for (let index = 0; index < scr_items.length; index++) {
			let scr_item = scr_items[index];
			let scr_item_offset = offset(scr_item).top;
			let scr_item_height = scr_item.offsetHeight;


			let scr_item_point = window.innerHeight - (window.innerHeight - scr_item_height / 3);
			if (window.innerHeight > scr_item_height) {
				scr_item_point = window.innerHeight - scr_item_height / 3;
			}

			if ((src_value > scr_item_offset - scr_item_point) && src_value < (scr_item_offset + scr_item_height)) {
				scr_item.classList.add('_active');
				scroll_load_item(scr_item);
			} else {
				scr_item.classList.remove('_active');
			}
			if (((src_value > scr_item_offset - window.innerHeight))) {
				if (scr_item.querySelectorAll('._lazy').length > 0) {
					scroll_lazy(scr_item);
				}
			}
		}
	}
	if (scr_fix_block.length > 0) {
		fix_block(scr_fix_block, src_value);
	}
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	if (custom_scroll_line) {
		let window_height = window.innerHeight;
		let content_height = document.querySelector('.wrapper').offsetHeight;
		let scr_procent = (pageYOffset / (content_height - window_height)) * 100;
		let custom_scroll_line_height = custom_scroll_line.offsetHeight;
		custom_scroll_line.style.transform = "translateY(" + (window_height - custom_scroll_line_height) / 100 * scr_procent + "px)";
	}
	if (src_value > scrollDirection) {
		// downscroll code
	} else {
		// upscroll code
	}
	scrollDirection = src_value <= 0 ? 0 : src_value;
}
setTimeout(function () {
	//document.addEventListener("DOMContentLoaded", scroll_scroll);
	scroll_scroll();
}, 100);

function scroll_lazy(scr_item) {
	let lazy_src = scr_item.querySelectorAll('*[data-src]');
	if (lazy_src.length > 0) {
		for (let index = 0; index < lazy_src.length; index++) {
			const el = lazy_src[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('src', el.getAttribute('data-src'));
				el.classList.add('_loaded');
			}
		}
	}
	let lazy_srcset = scr_item.querySelectorAll('*[data-srcset]');
	if (lazy_srcset.length > 0) {
		for (let index = 0; index < lazy_srcset.length; index++) {
			const el = lazy_srcset[index];
			if (!el.classList.contains('_loaded')) {
				el.setAttribute('srcset', el.getAttribute('data-srcset'));
				el.classList.add('_loaded');
			}
		}
	}
}
function scroll_load_item(scr_item) {
	if (scr_item.classList.contains('_load-map') && !scr_item.classList.contains('_loaded-map')) {
		let map_item = document.getElementById('map');
		if (map_item) {
			scr_item.classList.add('_loaded-map');
			map();
		}
	}
}
function map() {
	const scriptMapSrc = document.querySelector('script[data-src]');
	const loadMapUrl = scriptMapSrc.dataset.src;
	if (loadMapUrl) {
		scriptMapSrc.removeAttribute('data-src');
		scriptMapSrc.setAttribute('src', loadMapUrl);
	}
}
function scrParallax(block, scrProcent, blockHeight) {
	let prlxItems = block.querySelectorAll('._prlx-item');
	if (prlxItems.length > 0) {
		for (let index = 0; index < prlxItems.length; index++) {
			const prlxItem = prlxItems[index];
			let prlxItemAttr = (prlxItem.dataset.prlx) ? prlxItem.dataset.prlx : 3;
			const prlxItemValue = -1 * (blockHeight / 100 * scrProcent / prlxItemAttr);
			prlxItem.style.cssText = `transform: translateY(${prlxItemValue}px);`;
		}
	}
}
//FullScreenScroll
if (scr_blocks.length > 0 && !isMobile.any()) {
	disableScroll();
	window.addEventListener('wheel', full_scroll);

	let swiperScrolls = document.querySelectorAll('._swiper_scroll');

	if (swiperScrolls.length > 0) {
		for (let index = 0; index < swiperScrolls.length; index++) {
			const swiperScroll = swiperScrolls[index];
			swiperScroll.addEventListener("mouseenter", function (e) {
				window.removeEventListener('wheel', full_scroll);
			});
			swiperScroll.addEventListener("mouseleave", function (e) {
				window.addEventListener('wheel', full_scroll);
			});
		}
	}
}
function getPrevBlockPos(current_block_prev) {
	let viewport_height = window.innerHeight;
	let current_block_prev_height = current_block_prev.offsetHeight;
	let block_pos = offset(current_block_prev).top;

	if (current_block_prev_height >= viewport_height) {
		block_pos = block_pos + (current_block_prev_height - viewport_height);
	}
	return block_pos;
}
function full_scroll(e) {
	let viewport_height = window.innerHeight;
	if (viewport_height >= scr_min_height) {
		if (scrolling_full) {
			let current_block = document.querySelector('._scr-sector._scr-sector_current');
			let current_block_pos = offset(current_block).top;
			let current_block_height = current_block.offsetHeight;
			let current_block_next = current_block.nextElementSibling;
			let current_block_prev = current_block.previousElementSibling;
			if (e.keyCode == 40 || e.keyCode == 34 || e.deltaX > 0 || e.deltaY < 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_prev) {
						full_scroll_to_sector(getPrevBlockPos(current_block_prev));
					}
				} else {
					enableScroll();
					if (currentScroll <= current_block_pos) {
						if (current_block_prev) {
							full_scroll_to_sector(getPrevBlockPos(current_block_prev));
						}
					}
				}
			} else if (e.keyCode == 38 || e.keyCode == 33 || e.deltaX < 0 || e.deltaY > 0) {
				if (current_block_height <= viewport_height) {
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						full_scroll_to_sector(block_pos);
					}
				} else {
					enableScroll();
					if (current_block_next) {
						let block_pos = offset(current_block_next).top;
						if (currentScroll >= block_pos - viewport_height) {
							full_scroll_to_sector(block_pos);
						}
					}
				}
			}
		} else {
			disableScroll();
		}
	} else {
		enableScroll();
	}
}
function full_scroll_to_sector(pos) {
	disableScroll();
	scrolling_full = false;
	_goto(pos, 800);

	let scr_pause = 500;
	if (navigator.appVersion.indexOf("Mac") != -1) {
		scr_pause = 1000;
	};
	setTimeout(function () {
		scrolling_full = true;
	}, scr_pause);
}
function full_scroll_pagestart() { }
function full_scroll_pageend() { }

//ScrollOnClick (Navigation)
let link = document.querySelectorAll('._goto-block');
if (link) {
	let blocks = [];
	for (let index = 0; index < link.length; index++) {
		let el = link[index];
		let block_name = el.getAttribute('href').replace('#', '');
		if (block_name != '' && !~blocks.indexOf(block_name)) {
			blocks.push(block_name);
		}
		el.addEventListener('click', function (e) {
			if (document.querySelector('.menu__body._active')) {
				menu_close();
				body_lock_remove(500);
			}
			let target_block_class = el.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		})
	}

	window.addEventListener('scroll', function (el) {
		let old_current_link = document.querySelectorAll('._goto-block._active');
		if (old_current_link) {
			for (let index = 0; index < old_current_link.length; index++) {
				let el = old_current_link[index];
				el.classList.remove('_active');
			}
		}
		for (let index = 0; index < blocks.length; index++) {
			let block = blocks[index];
			let block_item = document.querySelector('.' + block);
			if (block_item) {
				let block_offset = offset(block_item).top;
				let block_height = block_item.offsetHeight;
				if ((pageYOffset > block_offset - window.innerHeight / 3) && pageYOffset < (block_offset + block_height) - window.innerHeight / 3) {
					let current_links = document.querySelectorAll('._goto-block[href="#' + block + '"]');
					for (let index = 0; index < current_links.length; index++) {
						let current_link = current_links[index];
						current_link.classList.add('_active');
					}
				}
			}
		}
	})
}
//ScrollOnClick (Simple)
let goto_links = document.querySelectorAll('._goto');
if (goto_links) {
	for (let index = 0; index < goto_links.length; index++) {
		let goto_link = goto_links[index];
		goto_link.addEventListener('click', function (e) {
			let target_block_class = goto_link.getAttribute('href').replace('#', '');
			let target_block = document.querySelector('.' + target_block_class);
			_goto(target_block, 300);
			e.preventDefault();
		});
	}
}
function _goto(target_block, speed, offset = 0) {
	let header = '';
	//OffsetHeader
	//if (window.innerWidth < 992) {
	//	header = 'header';
	//}
	let options = {
		speedAsDuration: true,
		speed: speed,
		header: header,
		offset: offset,
		easing: 'easeOutQuad',
	};
	let scr = new SmoothScroll();
	scr.animateScroll(target_block, '', options);
}

//SameFunctions
function offset(el) {
	var rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
	document.addEventListener('wheel', preventDefault, { passive: false }); // Disable scrolling in Chrome
	window.onwheel = preventDefault; // modern standard
	window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	window.ontouchmove = preventDefault; // mobile
	document.onkeydown = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
	document.removeEventListener('wheel', preventDefault, { passive: false }); // Enable scrolling in Chrome
	window.onmousewheel = document.onmousewheel = null;
	window.onwheel = null;
	window.ontouchmove = null;
	document.onkeydown = null;
}
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
	e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
	/*if (keys[e.keyCode]) {
		preventDefault(e);
		return false;
	}*/
}

function fix_block(scr_fix_block, scr_value) {
	let window_width = parseInt(window.innerWidth);
	let window_height = parseInt(window.innerHeight);
	let header_height = parseInt(document.querySelector('header').offsetHeight) + 15;
	for (let index = 0; index < scr_fix_block.length; index++) {
		const block = scr_fix_block[index];
		let block_width = block.getAttribute('data-width');
		const item = block.querySelector('._side-block');
		if (!block_width) { block_width = 0; }
		if (window_width > block_width) {
			if (item.offsetHeight < window_height - (header_height + 30)) {
				if (scr_value > offset(block).top - (header_height + 15)) {
					item.style.cssText = "position:fixed;bottom:auto;top:" + header_height + "px;width:" + block.offsetWidth + "px;left:" + offset(block).left + "px;";
				} else {
					gotoRelative(item);
				}
				if (scr_value > (block.offsetHeight + offset(block).top) - (item.offsetHeight + (header_height + 15))) {
					block.style.cssText = "position:relative;";
					item.style.cssText = "position:absolute;bottom:0;top:auto;left:0px;width:100%";
				}
			} else {
				gotoRelative(item);
			}
		}
	}
	function gotoRelative(item) {
		item.style.cssText = "position:relative;bottom:auto;top:0px;left:0px;";
	}
}

if (!isMobile.any()) {
	//custom_scroll();
	/*
	window.addEventListener('wheel', scroll_animate, {
		capture: true,
		passive: true
	});
	window.addEventListener('resize', custom_scroll, {
		capture: true,
		passive: true
	});
	*/
}
function custom_scroll(event) {
	scr_body.style.overflow = 'hidden';
	let window_height = window.innerHeight;
	let custom_scroll_line = document.querySelector('._custom-scroll__line');
	let custom_scroll_content_height = document.querySelector('.wrapper').offsetHeight;
	let custom_cursor_height = Math.min(window_height, Math.round(window_height * (window_height / custom_scroll_content_height)));
	if (custom_scroll_content_height > window_height) {
		if (!custom_scroll_line) {
			let custom_scroll = document.createElement('div');
			custom_scroll_line = document.createElement('div');
			custom_scroll.setAttribute('class', '_custom-scroll');
			custom_scroll_line.setAttribute('class', '_custom-scroll__line');
			custom_scroll.appendChild(custom_scroll_line);
			scr_body.appendChild(custom_scroll);
		}
		custom_scroll_line.style.height = custom_cursor_height + 'px';
	}
}

let new_pos = pageYOffset;
function scroll_animate(event) {
	let window_height = window.innerHeight;
	let content_height = document.querySelector('.wrapper').offsetHeight;
	let start_position = pageYOffset;
	let pos_add = 100;

	if (event.keyCode == 40 || event.keyCode == 34 || event.deltaX > 0 || event.deltaY < 0) {
		new_pos = new_pos - pos_add;
	} else if (event.keyCode == 38 || event.keyCode == 33 || event.deltaX < 0 || event.deltaY > 0) {
		new_pos = new_pos + pos_add;
	}
	if (new_pos > (content_height - window_height)) new_pos = content_height - window_height;
	if (new_pos < 0) new_pos = 0;

	if (scrolling) {
		scrolling = false;
		_goto(new_pos, 1000);

		let scr_pause = 100;
		if (navigator.appVersion.indexOf("Mac") != -1) {
			scr_pause = scr_pause * 2;
		};
		setTimeout(function () {
			scrolling = true;
			_goto(new_pos, 1000);
		}, scr_pause);
	}
	//If native scroll
	//disableScroll();
}

/* Map */
function mapAdd() {
	let tag = document.createElement('script');
	tag.src = "https://maps.google.com/maps/api/js?sensor=false&amp&key=&callback=mapInit";
	let firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function mapInit(n = 1) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(50.44823901771485, 30.49139726423639)],
		[new google.maps.LatLng(50.420495625109446, 30.26115759827361)],
	]
	var options = {
		zoom: 12,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	if (window.innerWidth < 1400 && window.innerWidth >= 768) {
		options = {
			zoom: 11,
			panControl: false,
			mapTypeControl: false,
			center: locations[0][0],
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}
	if (window.innerWidth < 768) {
		options = {
			zoom: 9,
			panControl: false,
			mapTypeControl: false,
			center: locations[0][0],
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}
	if (document.getElementById('map')) {
		var map = new google.maps.Map(document.getElementById('map'), options);
		var icon = {
			url: 'img/icons/location.svg',
			scaledSize: new google.maps.Size(29, 38),
			anchor: new google.maps.Point(9, 10)
		}
		for (var i = 0; i < locations.length; i++) {
			var marker = new google.maps.Marker({
				icon: icon,
				position: locations[i][0],
				map: map,
			});
			google.maps.event.addListener(marker, 'click', (function (marker, i) {
				return function () {
					for (var m = 0; m < markers.length; m++) {
						markers[m].setIcon(icon);
					}
					var cnt = i + 1;
					//infowindow.setContent(document.querySelector('.events-map__item_' + cnt).innerHTML);
					//infowindow.open(map, marker);
					marker.setIcon(icon);
					map.setCenterWithOffset(marker.getPosition(), 0, 0);
					setTimeout(function () {

					}, 10);
				}
			})(marker, i));
			markers.push(marker);
		}
		if (n) {
			var nc = n - 1;
			setTimeout(function () {
				google.maps.event.trigger(markers[nc], 'click');
			}, 500);
		}
	}
}


if (document.querySelector('#map')) {
	document.addEventListener('DOMContentLoaded', (e) => {
		mapAdd();
	});

}
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();

 //Zoom
 /**!
 * lg-zoom.js | 1.3.0-beta.0 | October 5th 2020
 * http://sachinchoolur.github.io/lg-zoom.js
 * Copyright (c) 2016 Sachin N; 
 * @license GPLv3 
 */(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.LgZoom = f() } })(function () {
	var define, module, exports; return (function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
		1: [function (require, module, exports) {
			(function (global, factory) {
				if (typeof define === "function" && define.amd) {
					define([], factory);
				} else if (typeof exports !== "undefined") {
					factory();
				} else {
					var mod = {
						exports: {}
					};
					factory();
					global.lgZoom = mod.exports;
				}
			})(this, function () {
				'use strict';

				var _extends = Object.assign || function (target) {
					for (var i = 1; i < arguments.length; i++) {
						var source = arguments[i];

						for (var key in source) {
							if (Object.prototype.hasOwnProperty.call(source, key)) {
								target[key] = source[key];
							}
						}
					}

					return target;
				};

				var getUseLeft = function getUseLeft() {
					var useLeft = false;
					var isChrome = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
					if (isChrome && parseInt(isChrome[2], 10) < 54) {
						useLeft = true;
					}

					return useLeft;
				};

				var zoomDefaults = {
					scale: 1,
					zoom: true,
					actualSize: true,
					enableZoomAfter: 300,
					useLeftForZoom: getUseLeft()
				};

				var Zoom = function Zoom(element) {

					this.el = element;

					this.core = window.lgData[this.el.getAttribute('lg-uid')];
					this.core.s = _extends({}, zoomDefaults, this.core.s);

					if (this.core.s.zoom && this.core.doCss()) {
						this.init();

						// Store the zoomable timeout value just to clear it while closing
						this.zoomabletimeout = false;

						// Set the initial value center
						this.pageX = window.innerWidth / 2;
						this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
					}

					return this;
				};

				Zoom.prototype.init = function () {

					var _this = this;
					var zoomIcons = '<button type="button" aria-label="Zoom in" id="lg-zoom-in" class="lg-icon"></button><button type="button" aria-label="Zoom out" id="lg-zoom-out" class="lg-icon"></button>';

					if (_this.core.s.actualSize) {
						zoomIcons += '<button type="button" aria-label="Actual size" id="lg-actual-size" class="lg-icon"></button>';
					}

					if (_this.core.s.useLeftForZoom) {
						utils.addClass(_this.core.outer, 'lg-use-left-for-zoom');
					} else {
						utils.addClass(_this.core.outer, 'lg-use-transition-for-zoom');
					}

					this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', zoomIcons);

					// Add zoomable class
					utils.on(_this.core.el, 'onSlideItemLoad.lgtmzoom', function (event) {

						// delay will be 0 except first time
						var _speed = _this.core.s.enableZoomAfter + event.detail.delay;

						// set _speed value 0 if gallery opened from direct url and if it is first slide
						if (utils.hasClass(document.body, 'lg-from-hash') && event.detail.delay) {

							// will execute only once
							_speed = 0;
						} else {

							// Remove lg-from-hash to enable starting animation.
							utils.removeClass(document.body, 'lg-from-hash');
						}

						_this.zoomabletimeout = setTimeout(function () {
							utils.addClass(_this.core.___slide[event.detail.index], 'lg-zoomable');
						}, _speed + 30);
					});

					var scale = 1;
					/**
					 * @desc Image zoom
					 * Translate the wrap and scale the image to get better user experience
					 *
					 * @param {String} scaleVal - Zoom decrement/increment value
					 */
					var zoom = function zoom(scaleVal) {

						var image = _this.core.outer.querySelector('.lg-current .lg-image');
						var _x;
						var _y;

						// Find offset manually to avoid issue after zoom
						var offsetX = (window.innerWidth - image.clientWidth) / 2;
						var offsetY = (window.innerHeight - image.clientHeight) / 2 + (document.documentElement.scrollTop || document.body.scrollTop);

						_x = _this.pageX - offsetX;
						_y = _this.pageY - offsetY;

						var x = (scaleVal - 1) * _x;
						var y = (scaleVal - 1) * _y;

						utils.setVendor(image, 'Transform', 'scale3d(' + scaleVal + ', ' + scaleVal + ', 1)');
						image.setAttribute('data-scale', scaleVal);

						if (_this.core.s.useLeftForZoom) {
							image.parentElement.style.left = -x + 'px';
							image.parentElement.style.top = -y + 'px';
						} else {
							utils.setVendor(image.parentElement, 'Transform', 'translate3d(-' + x + 'px, -' + y + 'px, 0)');
						}

						image.parentElement.setAttribute('data-x', x);
						image.parentElement.setAttribute('data-y', y);
					};

					var callScale = function callScale() {
						if (scale > 1) {
							utils.addClass(_this.core.outer, 'lg-zoomed');
						} else {
							_this.resetZoom();
						}

						if (scale < 1) {
							scale = 1;
						}

						zoom(scale);
					};

					var actualSize = function actualSize(event, image, index, fromIcon) {
						var w = image.clientWidth;
						var nw;
						if (_this.core.s.dynamic) {
							nw = _this.core.s.dynamicEl[index].width || image.naturalWidth || w;
						} else {
							nw = _this.core.items[index].getAttribute('data-width') || image.naturalWidth || w;
						}

						var _scale;

						if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
							scale = 1;
						} else {
							if (nw > w) {
								_scale = nw / w;
								scale = _scale || 2;
							}
						}

						if (fromIcon) {
							_this.pageX = window.innerWidth / 2;
							_this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
						} else {
							_this.pageX = event.pageX || event.targetTouches[0].pageX;
							_this.pageY = event.pageY || event.targetTouches[0].pageY;
						}

						callScale();
						setTimeout(function () {
							utils.removeClass(_this.core.outer, 'lg-grabbing');
							utils.addClass(_this.core.outer, 'lg-grab');
						}, 10);
					};

					var tapped = false;

					// event triggered after appending slide content
					utils.on(_this.core.el, 'onAferAppendSlide.lgtmzoom', function (event) {

						var index = event.detail.index;

						// Get the current element
						var image = _this.core.___slide[index].querySelector('.lg-image');

						if (!_this.core.isTouch) {
							utils.on(image, 'dblclick', function (event) {
								actualSize(event, image, index);
							});
						}

						if (_this.core.isTouch) {
							utils.on(image, 'touchstart', function (event) {
								if (!tapped) {
									tapped = setTimeout(function () {
										tapped = null;
									}, 300);
								} else {
									clearTimeout(tapped);
									tapped = null;
									actualSize(event, image, index);
								}

								event.preventDefault();
							});
						}
					});

					// Update zoom on resize and orientationchange
					utils.on(window, 'resize.lgzoom scroll.lgzoom orientationchange.lgzoom', function () {
						_this.pageX = window.innerWidth / 2;
						_this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
						zoom(scale);
					});

					utils.on(document.getElementById('lg-zoom-out'), 'click.lg', function () {
						if (_this.core.outer.querySelector('.lg-current .lg-image')) {
							scale -= _this.core.s.scale;
							callScale();
						}
					});

					utils.on(document.getElementById('lg-zoom-in'), 'click.lg', function () {
						if (_this.core.outer.querySelector('.lg-current .lg-image')) {
							scale += _this.core.s.scale;
							callScale();
						}
					});

					utils.on(document.getElementById('lg-actual-size'), 'click.lg', function (event) {
						actualSize(event, _this.core.___slide[_this.core.index].querySelector('.lg-image'), _this.core.index, true);
					});

					// Reset zoom on slide change
					utils.on(_this.core.el, 'onBeforeSlide.lgtm', function () {
						scale = 1;
						_this.resetZoom();
					});

					// Drag option after zoom
					if (!_this.core.isTouch) {
						_this.zoomDrag();
					}

					if (_this.core.isTouch) {
						_this.zoomSwipe();
					}
				};

				Zoom.prototype.getModifier = function (rotateValue, axis, el) {
					var originalRotate = rotateValue;
					rotateValue = Math.abs(rotateValue);
					var transformValues = this.getCurrentTransform(el);
					if (!transformValues) {
						return 1;
					}
					var modifier = 1;
					if (axis === 'X') {
						var flipHorizontalValue = Math.sign(parseFloat(transformValues[0]));
						if (rotateValue === 0 || rotateValue === 180) {
							modifier = 1;
						} else if (rotateValue === 90) {
							if (originalRotate === -90 && flipHorizontalValue === 1 || originalRotate === 90 && flipHorizontalValue === -1) {
								modifier = -1;
							} else {
								modifier = 1;
							}
						}
						modifier = modifier * flipHorizontalValue;
					} else {
						var flipVerticalValue = Math.sign(parseFloat(transformValues[3]));
						if (rotateValue === 0 || rotateValue === 180) {
							modifier = 1;
						} else if (rotateValue === 90) {
							var sinX = parseFloat(transformValues[1]);
							var sinMinusX = parseFloat(transformValues[2]);
							modifier = Math.sign(sinX * sinMinusX * originalRotate * flipVerticalValue);
						}
						modifier = modifier * flipVerticalValue;
					}
					return modifier;
				};

				Zoom.prototype.getImageSize = function ($image, rotateValue, axis) {
					var imageSizes = {
						y: 'offsetHeight',
						x: 'offsetWidth'
					};
					if (rotateValue === 90) {
						// Swap axis 
						if (axis === 'x') {
							axis = 'y';
						} else {
							axis = 'x';
						}
					}
					return $image[imageSizes[axis]];
				};

				Zoom.prototype.getDragCords = function (e, rotateValue) {
					if (rotateValue === 90) {
						return {
							x: e.pageY,
							y: e.pageX
						};
					} else {
						return {
							x: e.pageX,
							y: e.pageY
						};
					}
				};
				Zoom.prototype.getSwipeCords = function (e, rotateValue) {
					var x = e.targetTouches[0].pageX;
					var y = e.targetTouches[0].pageY;
					if (rotateValue === 90) {
						return {
							x: y,
							y: x
						};
					} else {
						return {
							x: x,
							y: y
						};
					}
				};

				Zoom.prototype.getPossibleDragCords = function ($image, rotateValue) {

					var minY = (this.core.outer.querySelector('.lg').clientHeight - this.getImageSize($image, rotateValue, 'y')) / 2;
					var maxY = Math.abs(this.getImageSize($image, rotateValue, 'y') * Math.abs($image.getAttribute('data-scale')) - this.core.outer.querySelector('.lg').clientHeight + minY);
					var minX = (this.core.outer.querySelector('.lg').clientWidth - this.getImageSize($image, rotateValue, 'x')) / 2;
					var maxX = Math.abs(this.getImageSize($image, rotateValue, 'x') * Math.abs($image.getAttribute('data-scale')) - this.core.outer.querySelector('.lg').clientWidth + minX);
					if (rotateValue === 90) {
						return {
							minY: minX,
							maxY: maxX,
							minX: minY,
							maxX: maxY
						};
					} else {
						return {
							minY: minY,
							maxY: maxY,
							minX: minX,
							maxX: maxX
						};
					}
				};

				Zoom.prototype.getDragAllowedAxises = function ($image, rotateValue) {
					var allowY = this.getImageSize($image, rotateValue, 'y') * $image.getAttribute('data-scale') > this.core.outer.querySelector('.lg').clientHeight;
					var allowX = this.getImageSize($image, rotateValue, 'x') * $image.getAttribute('data-scale') > this.core.outer.querySelector('.lg').clientWidth;
					if (rotateValue === 90) {
						return {
							allowX: allowY,
							allowY: allowX
						};
					} else {
						return {
							allowX: allowX,
							allowY: allowY
						};
					}
				};

				/**
				 * 
				 * @param {Element} el 
				 * @return matrix(cos(X), sin(X), -sin(X), cos(X), 0, 0);
				 * Get the current transform value
				 */
				Zoom.prototype.getCurrentTransform = function (el) {
					if (!el) {
						return 0;
					}
					var st = window.getComputedStyle(el, null);
					var tm = st.getPropertyValue('-webkit-transform') || st.getPropertyValue('-moz-transform') || st.getPropertyValue('-ms-transform') || st.getPropertyValue('-o-transform') || st.getPropertyValue('transform') || 'none';
					if (tm !== 'none') {
						return tm.split('(')[1].split(')')[0].split(',');
					}
					return 0;
				};

				Zoom.prototype.getCurrentRotation = function (el) {
					if (!el) {
						return 0;
					}
					var values = this.getCurrentTransform(el);
					if (values) {
						return Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
						// If you want rotate in 360
						//return (angle < 0 ? angle + 360 : angle);
					}
					return 0;
				};

				// Reset zoom effect
				Zoom.prototype.resetZoom = function () {
					utils.removeClass(this.core.outer, 'lg-zoomed');
					for (var i = 0; i < this.core.___slide.length; i++) {
						if (this.core.___slide[i].querySelector('.lg-img-wrap')) {
							this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('style');
							this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-x');
							this.core.___slide[i].querySelector('.lg-img-wrap').removeAttribute('data-y');
						}
					}

					for (var j = 0; j < this.core.___slide.length; j++) {
						if (this.core.___slide[j].querySelector('.lg-image')) {
							this.core.___slide[j].querySelector('.lg-image').removeAttribute('style');
							this.core.___slide[j].querySelector('.lg-image').removeAttribute('data-scale');
						}
					}

					// Reset pagx pagy values to center
					this.pageX = window.innerWidth / 2;
					this.pageY = window.innerHeight / 2 + (document.documentElement.scrollTop || document.body.scrollTop);
				};

				Zoom.prototype.zoomSwipe = function () {
					var _this = this;
					var startCoords = {};
					var endCoords = {};
					var isMoved = false;

					// Allow x direction drag
					var allowX = false;

					// Allow Y direction drag
					var allowY = false;

					var rotateValue = 0;
					var rotateEl;

					for (var i = 0; i < _this.core.___slide.length; i++) {

						/*jshint loopfunc: true */
						utils.on(_this.core.___slide[i], 'touchstart.lg', function (e) {

							if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
								var $image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

								rotateEl = _this.core.___slide[_this.core.index].querySelector('.lg-img-rotate');
								rotateValue = _this.getCurrentRotation(rotateEl);

								var dragAllowedAxises = _this.getDragAllowedAxises($image, Math.abs(rotateValue));
								allowY = dragAllowedAxises.allowY;
								allowX = dragAllowedAxises.allowX;

								if (allowX || allowY) {
									e.preventDefault();
									startCoords = _this.getSwipeCords(e, Math.abs(rotateValue));
								}
							}
						});
					}

					for (var j = 0; j < _this.core.___slide.length; j++) {

						/*jshint loopfunc: true */
						utils.on(_this.core.___slide[j], 'touchmove.lg', function (e) {

							if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {

								var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
								var distanceX;
								var distanceY;

								e.preventDefault();
								isMoved = true;

								endCoords = _this.getSwipeCords(e, Math.abs(rotateValue));

								// reset opacity and transition duration
								utils.addClass(_this.core.outer, 'lg-zoom-dragging');

								if (allowY) {
									distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y) * _this.getModifier(rotateValue, 'Y', rotateEl);
								} else {
									distanceY = -Math.abs(_el.getAttribute('data-y'));
								}

								if (allowX) {
									distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x) * _this.getModifier(rotateValue, 'X', rotateEl);
								} else {
									distanceX = -Math.abs(_el.getAttribute('data-x'));
								}

								if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {

									if (_this.core.s.useLeftForZoom) {
										_el.style.left = distanceX + 'px';
										_el.style.top = distanceY + 'px';
									} else {
										utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
									}
								}
							}
						});
					}

					for (var k = 0; k < _this.core.___slide.length; k++) {

						/*jshint loopfunc: true */
						utils.on(_this.core.___slide[k], 'touchend.lg', function () {
							if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
								if (isMoved) {
									isMoved = false;
									utils.removeClass(_this.core.outer, 'lg-zoom-dragging');
									_this.touchendZoom(startCoords, endCoords, allowX, allowY, rotateValue);
								}
							}
						});
					}
				};

				Zoom.prototype.zoomDrag = function () {

					var _this = this;
					var startCoords = {};
					var endCoords = {};
					var isDraging = false;
					var isMoved = false;

					// Allow x direction drag
					var allowX = false;

					// Allow Y direction drag
					var allowY = false;

					var rotateValue = 0;
					var rotateEl;

					for (var i = 0; i < _this.core.___slide.length; i++) {

						/*jshint loopfunc: true */
						utils.on(_this.core.___slide[i], 'mousedown.lgzoom', function (e) {

							// execute only on .lg-object
							var $image = _this.core.___slide[_this.core.index].querySelector('.lg-object');

							rotateEl = _this.core.___slide[_this.core.index].querySelector('.lg-img-rotate');
							rotateValue = _this.getCurrentRotation(rotateEl);

							var dragAllowedAxises = _this.getDragAllowedAxises($image, Math.abs(rotateValue));
							allowY = dragAllowedAxises.allowY;
							allowX = dragAllowedAxises.allowX;

							if (utils.hasClass(_this.core.outer, 'lg-zoomed')) {
								if (utils.hasClass(e.target, 'lg-object') && (allowX || allowY)) {
									e.preventDefault();
									startCoords = _this.getDragCords(e, Math.abs(rotateValue));

									isDraging = true;

									// ** Fix for webkit cursor issue https://code.google.com/p/chromium/issues/detail?id=26723
									_this.core.outer.scrollLeft += 1;
									_this.core.outer.scrollLeft -= 1;

									utils.removeClass(_this.core.outer, 'lg-grab');
									utils.addClass(_this.core.outer, 'lg-grabbing');
								}
							}
						});
					}

					utils.on(window, 'mousemove.lgzoom', function (e) {
						if (isDraging) {
							var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
							var distanceX;
							var distanceY;

							isMoved = true;
							endCoords = _this.getDragCords(e, Math.abs(rotateValue));

							// reset opacity and transition duration
							utils.addClass(_this.core.outer, 'lg-zoom-dragging');

							if (allowY) {
								distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y) * _this.getModifier(rotateValue, 'Y', rotateEl);
							} else {
								distanceY = -Math.abs(_el.getAttribute('data-y'));
							}

							if (allowX) {
								distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x) * _this.getModifier(rotateValue, 'X', rotateEl);
							} else {
								distanceX = -Math.abs(_el.getAttribute('data-x'));
							}

							if (_this.core.s.useLeftForZoom) {
								_el.style.left = distanceX + 'px';
								_el.style.top = distanceY + 'px';
							} else {
								utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
							}
						}
					});

					utils.on(window, 'mouseup.lgzoom', function (e) {

						if (isDraging) {
							isDraging = false;
							utils.removeClass(_this.core.outer, 'lg-zoom-dragging');

							// Fix for chrome mouse move on click
							if (isMoved && (startCoords.x !== endCoords.x || startCoords.y !== endCoords.y)) {
								endCoords = _this.getDragCords(e, Math.abs(rotateValue));
								_this.touchendZoom(startCoords, endCoords, allowX, allowY, rotateValue);
							}

							isMoved = false;
						}

						utils.removeClass(_this.core.outer, 'lg-grabbing');
						utils.addClass(_this.core.outer, 'lg-grab');
					});
				};

				Zoom.prototype.touchendZoom = function (startCoords, endCoords, allowX, allowY, rotateValue) {

					var _this = this;
					var _el = _this.core.___slide[_this.core.index].querySelector('.lg-img-wrap');
					var image = _this.core.___slide[_this.core.index].querySelector('.lg-object');
					var rotateEl = _this.core.___slide[_this.core.index].querySelector('.lg-img-rotate');
					var distanceX = -Math.abs(_el.getAttribute('data-x')) + (endCoords.x - startCoords.x) * _this.getModifier(rotateValue, 'X', rotateEl);
					var distanceY = -Math.abs(_el.getAttribute('data-y')) + (endCoords.y - startCoords.y) * _this.getModifier(rotateValue, 'Y', rotateEl);
					var possibleDragCords = _this.getPossibleDragCords(image, Math.abs(rotateValue));

					if (Math.abs(endCoords.x - startCoords.x) > 15 || Math.abs(endCoords.y - startCoords.y) > 15) {
						if (allowY) {
							if (distanceY <= -possibleDragCords.maxY) {
								distanceY = -possibleDragCords.maxY;
							} else if (distanceY >= -possibleDragCords.minY) {
								distanceY = -possibleDragCords.minY;
							}
						}

						if (allowX) {
							if (distanceX <= -possibleDragCords.maxX) {
								distanceX = -possibleDragCords.maxX;
							} else if (distanceX >= -possibleDragCords.minX) {
								distanceX = -possibleDragCords.minX;
							}
						}

						if (allowY) {
							_el.setAttribute('data-y', Math.abs(distanceY));
						} else {
							distanceY = -Math.abs(_el.getAttribute('data-y'));
						}

						if (allowX) {
							_el.setAttribute('data-x', Math.abs(distanceX));
						} else {
							distanceX = -Math.abs(_el.getAttribute('data-x'));
						}

						if (_this.core.s.useLeftForZoom) {
							_el.style.left = distanceX + 'px';
							_el.style.top = distanceY + 'px';
						} else {
							utils.setVendor(_el, 'Transform', 'translate3d(' + distanceX + 'px, ' + distanceY + 'px, 0)');
						}
					}
				};

				Zoom.prototype.destroy = function () {

					var _this = this;

					// Unbind all events added by lightGallery zoom plugin
					utils.off(_this.core.el, '.lgzoom');
					utils.off(window, '.lgzoom');
					for (var i = 0; i < _this.core.___slide.length; i++) {
						utils.off(_this.core.___slide[i], '.lgzoom');
					}

					utils.off(_this.core.el, '.lgtmzoom');
					_this.resetZoom();
					clearTimeout(_this.zoomabletimeout);
					_this.zoomabletimeout = false;
				};

				window.lgModules.zoom = Zoom;
			});

		}, {}]
	}, {}, [1])(1)
});
