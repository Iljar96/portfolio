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
			// slider.data('lightGallery').destroy(true);
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

let scheduleSlider = new Swiper('.schedule__slider', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 100,
	autoHeight: true,
	grabCursor: true,
	speed: 1500,
	touchRatio: 0,
	simulateTouch: false,
	//loop: true,
	//preloadImages: false,
	//lazy: true,
	// Dotts
	//pagination: {
	//	el: '.slider-quality__pagging',
	//	clickable: true,
	//},
	// Arrows
	navigation: {
		nextEl: '.schedule__slider-btn--next',
		prevEl: '.schedule__slider-btn--prev',
	},
	/*
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
		1268: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	},
	*/
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

let teamSlider = new Swiper('.team__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 30,
	autoHeight: true,
	speed: 800,
	loop: true,
	lazy: true,
	// Arrows
	navigation: {
		nextEl: '.team__slider-btn--next',
		prevEl: '.team__slider-btn--prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30,

		},
		768: {
			slidesPerView: 2,
			spaceBetween: 30,

		},
		992: {
			slidesPerView: 3,
			spaceBetween: 30,

		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

let reviewsSlider = new Swiper('.reviews__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 50,
	autoHeight: true,
	speed: 800,
	grabCursor: true,
	loop: true,
	slideToClickedSlide: true,
	lazy: true,
	// Dotts
	pagination: {
		el: '.reviews__pagination',
		type: 'bullets',
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 50,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 50,
		},
		992: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});

let smallSwiper = new Swiper(".small-slider", {
	slidesPerView: 1,
	slidesPerGroup: 1,
	spaceBetween: 10,
	nested: true,
	navigation: {
		nextEl: '.schedule--next',
		prevEl: '.schedule--prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30,

		},
		414: {
			slidesPerView: 2,
			spaceBetween: 10,

		},
		620: {
			slidesPerView: 3,
			spaceBetween: 10,

		},
		800: {
			slidesPerView: 4,
			spaceBetween: 10,

		},
	},
});


var swiper = new Swiper(".gallery-swiper", {
	slidesPerView: 1,
	slidesPerColumn: 1,
	slidesPerGroup: 1,
	spaceBetween: 30,
	navigation: {
		nextEl: '.gallery--next',
		prevEl: '.gallery--prev',
	},
	breakpoints: {
		600: {
			slidesPerView: 2,
			slidesPerColumn: 2,
			slidesPerGroup: 2,
			spaceBetween: 0,

		},
		992: {
			slidesPerView: 3,
			slidesPerColumn: 3,
			slidesPerGroup: 3,
			spaceBetween: 0,

		},
	},
});
