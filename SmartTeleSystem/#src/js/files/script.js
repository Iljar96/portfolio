window.onload = function () {
	document.querySelectorAll('._hidden')
		.forEach(item => item.classList.remove('_hidden'));
	popupSliderInit();


	const singleProductSlides = document.querySelectorAll('.single-product__swiper .single-product__slide');

	function changeCoordinates(parent, coordX, coordY) {
		parent.style.left = `${-coordX}px`
		parent.style.top = `${-coordY}px`
	}

	if (singleProductSlides.length > 0 && !document.querySelector('._touch')) {
		singleProductSlides.forEach(slide => {
			slide.addEventListener('mouseenter', e => {
				e.target.querySelector('img').classList.add('_hidden');
				const zoomImg = document.createElement("img");

				zoomImg.classList.add('zoom-img');
				zoomImg.src = e.target.querySelector('img').dataset.zoomsrc;
				e.target.closest('.single-product__slide').append(zoomImg);
				zoomImg.style.transform = 'scale(1.5)';

				slide.addEventListener('mousemove', e => {
					e.target.closest('.single-product__swiper').style.outline = '1px solid #6E6F80';
					const bounds = e.target.getBoundingClientRect();
					const clientX = e.clientX - bounds.left;
					const clientY = e.clientY - bounds.top;

					this.width = Math.round(bounds.width);
					this.height = Math.round(bounds.height);

					this.widthCenter = this.width / 2;
					this.heightCenter = this.height / 2;

					if (this.widthCenter && this.heightCenter) {
						this.mouseX = (clientX - this.widthCenter) / this.widthCenter * 70;
						this.mouseY = (clientY - this.heightCenter) / this.heightCenter * 50;
					}

					changeCoordinates(zoomImg, this.mouseX, this.mouseY)
				});
			});
			slide.addEventListener('mouseleave', e => {
				e.target.querySelector('.zoom-img').remove();
				e.target.querySelector('img').classList.remove('_hidden');
				e.target.closest('.single-product__swiper').style.outline = '0';
			});
		})
	}







}