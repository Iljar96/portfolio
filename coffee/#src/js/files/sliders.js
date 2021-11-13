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

let slider_clients = new Swiper('.clients__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 4,
	spaceBetween: 0,
	speed: 800,
	loop: true,
	lazy: true,
	grabCursor: true,
	// Dotts
	pagination: {
		el: '.clients__paginations',
		clickable: true,
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			autoHeight: true,
		},
		768: {
			slidesPerView: 2,
		},
		992: {
			slidesPerView: 3,
		},
		1268: {
			slidesPerView: 4,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});


let slider_review = new Swiper('.review__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 15,
	parallax: true,
	speed: 800,
	loop: true,
	lazy: true,
	grabCursor: true,
	// Arrows
	navigation: {
		nextEl: '.review__next',
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});


let slider_accessories = new Swiper('.accessories__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 15,
	speed: 800,
	loop: true,
	lazy: true,
	grabCursor: true,
	// Arrows
	navigation: {
		nextEl: '.accessories__next-btn',
	},
	breakpoints: {
		475: {
			slidesPerView: 2,
			spaceBetween: 15,
		},
		650: {
			slidesPerView: 3,
			spaceBetween: 15,
		},
		992: {
			slidesPerView: 4,
			spaceBetween: 15,
		},
	},
	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
});
