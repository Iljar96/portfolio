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

function popupSliderInit() {
	const singleProductThumbs = new Swiper(".single-product__swiper-thumbs", {
		slidesPerView: 3,
		spaceBetween: 10,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	const singleProduct = new Swiper(".single-product__swiper", {
		spaceBetween: 10,
		navigation: {
			nextEl: ".single-product__arrow--next",
			prevEl: ".single-product__arrow--prev",
		},
		thumbs: {
			swiper: singleProductThumbs
		},
	});
}


function buildProductSliders() {
	const tabBlocks = document.querySelectorAll('.product .product__block');
	tabBlocks.forEach((tabBlock, index) => {
		if (index === 0) {
			tabBlock.setAttribute('data-tabindex', 0);
			initProductSliders(index)
		} else {
			tabBlock.setAttribute('data-tabindex', index);
			tabBlock.closest('._tabs').querySelectorAll('._tabs-item')[index]
				.addEventListener('click', e => {
					if (!tabBlocks[index].querySelector('.swiper-container-initialized ')) {
						initProductSliders(index);
					}
				});
		}
	});

}

function initProductSliders(i) {
	new Swiper(`[data-tabindex="${i}"] .slider-product__body`, {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoHeight: true,
		speed: 800,
		touchRatio: 1,
		simulateTouch: true,
		loop: true,
		lazy: true,
		breakpoints: {
			768: {
				touchRatio: 0,
				simulateTouch: false,
				speed: 1200
			},
		},
		// Arrows
		navigation: {
			nextEl: `[data-tabindex="${i}"] .slider-product__arrow--next`,
			prevEl: `[data-tabindex="${i}"]  .slider-product__arrow--prev`,
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}
buildProductSliders()