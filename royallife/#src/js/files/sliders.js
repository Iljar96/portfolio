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


let slider_building1 = new Swiper('._building-slider-1', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._1.complex__item.next-slider',
		prevEl: '._1.complex__item.prev-slider',
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
let slider_building2 = new Swiper('._building-slider-2', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._2.complex__item.next-slider',
		prevEl: '._2.complex__item.prev-slider',
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

let slider_building3 = new Swiper('._building-slider-3', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._3.complex__item.next-slider',
		prevEl: '._3.complex__item.prev-slider',
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

let slider_building4 = new Swiper('._building-slider-4', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._4.complex__item.next-slider',
		prevEl: '._4.complex__item.prev-slider',
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

let slider_building5 = new Swiper('._building-slider-5', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 10,
	speed: 800,
	lazy: true,
	loop: true,
	// Arrows
	navigation: {
		nextEl: '._5.complex__item.next-slider',
		prevEl: '._5.complex__item.prev-slider',
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
