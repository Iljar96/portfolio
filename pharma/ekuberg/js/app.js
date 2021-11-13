//Zoom
/**!
* lg-zoom.js | 1.3.0-beta.0 | October 5th 2020
* http://sachinchoolur.github.io/lg-zoom.js
* Copyright (c) 2016 Sachin N; 
*/
if (!document.documentElement.classList.contains('ie')) {
	if (document.querySelectorAll('._gallery').length > 0) {
		(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.LgZoom = f() } })(function () {
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

	if (document.querySelectorAll('.intro__slider').length > 0) {
		let slider_intro = new Swiper('.intro__slider', {
			effect: 'fade',
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			loop: true,
			lazy: true,
			// Arrows
			navigation: {
				nextEl: '.intro__arrow--next',
				prevEl: '.intro__arrow--prev',
			},
			on: {
				lazyImageReady: function () {
					ibg();
				},
			}
		});
	}

	if (document.querySelectorAll('.brands__slider').length > 0) {
		let slider_brands = new Swiper('.brands__slider', {
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
			spaceBetween: 0,
			grabCursor: true,
			speed: 800,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			lazy: true,
			// Dotts
			pagination: {
				el: '.brands__pagination',
				clickable: true,
			},
			breakpoints: {
				370: {
					slidesPerView: 2,
					spaceBetween: 40,
					autoHeight: true,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 79,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 79,
				},
				1200: {
					slidesPerView: 5,
					spaceBetween: 79,
				},
			},
			on: {
				lazyImageReady: function () {
					ibg();
				},
			}
		});
	}
	if (document.querySelectorAll('.single-product').length > 0) {
		let slider_single_product = new Swiper('.single-product', {
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			grabCursor: true,
			autoHeight: true,
			speed: 800,
			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			lazy: true,
			// Dotts
			pagination: {
				el: '.single-product-pagination',
				clickable: true,
			},
			on: {
				lazyImageReady: function () {
					ibg();
				},
			}
		});
	}

	let slider_products;
	let sliderProductInit = false;

	if (document.querySelector('.products-swiper')) {
		function sliderInit() {
			slider_products = new Swiper(".products-swiper", {
				slidesPerView: 1,
				spaceBetween: 30,
				observer: true,
				observeParents: true,
				autoHeight: true,
				speed: 800,
				grabCursor: true,
				breakpoints: {
					400: {
						slidesPerView: 1,
					},
					768: {
						slidesPerView: 2,
					},
					1200: {
						slidesPerView: 3,
					},
					1250: {
						slidesPerView: 4,
						spaceBetween: 0,
					},
				},
				pagination: {
					el: ".products-swiper-pagination",
					clickable: true,
				},
				on: {
					lazyImageReady: function () {
						ibg();
					},
				}
			});
		}

		if (window.matchMedia("(max-width: 1250px)").matches) {
			sliderInit();
			sliderProductInit = true;
		}

		window.addEventListener('resize', function (e) {
			if (window.matchMedia("(max-width: 1250px)").matches && !sliderProductInit) {
				sliderInit();
				sliderProductInit = true;
			} else if (window.matchMedia("(min-width: 1250px)").matches && sliderProductInit) {
				sliderProductInit = false;
				for (let i = 0; i < slider_products.length; i++) {
					slider_products[i].destroy(true, true);
				}
			}
		})
	}
}

function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}


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

//=================
//Gallery
if (!document.documentElement.classList.contains('ie')) {
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
}
//=================
//Remove _hidden
document.addEventListener("DOMContentLoaded", function (event) {
	const hiddens = document.querySelectorAll('._hidden');
	if (hiddens.length > 0) {
		for (let i = 0; i < hiddens.length; i++) {
			hiddens[i].classList.remove('_hidden');
		}
	}

	// document.querySelectorAll('._hidden').forEach((el) => {
	// 	el.classList.remove('_hidden');
	// });
});

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
let iconMenu = document.querySelector(".burger");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".collapse");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("show");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".burger");
	let menuBody = document.querySelector(".collapse");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("show");
}

const mobileMenuLinks = document.querySelectorAll('.mobile-menu .menu-item-has-children > a');
for (let i = 0; i < mobileMenuLinks.length; i++) {
	mobileMenuLinks[i].addEventListener('click', function (e) {
		e.preventDefault();
		const targetSubMenu = e.target.closest('.menu-item-has-children').querySelector('.mobile-menu .sub-menu');
		_slideToggle(targetSubMenu, 500);
	})
}
// mobileMenuLinks.forEach(function (link) {
// 	link.addEventListener('click', function (e) {
// 		e.preventDefault();
// 		const targetSubMenu = e.target.closest('.menu-item-has-children').querySelector('.mobile-menu .sub-menu');
// 		_slideToggle(targetSubMenu);
// 	})
// })
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
		setTimeout(function () {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
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
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper-all').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper-all').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================
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
//Tabs
let tabs = document.querySelectorAll("._tabs");
for (let index = 0; index < tabs.length; index++) {
	let tab = tabs[index];
	let tabs_items = tab.querySelectorAll("._tabs-item");
	let tabs_blocks = tab.querySelectorAll("._tabs-block");
	for (let index = 0; index < tabs_items.length; index++) {
		let tabs_item = tabs_items[index];
		tabs_item.addEventListener("click", function (e) {
			for (let index = 0; index < tabs_items.length; index++) {
				let tabs_item = tabs_items[index];
				tabs_item.classList.remove('_active');
				tabs_blocks[index].classList.remove('_active');
			}
			tabs_item.classList.add('_active');
			tabs_blocks[index].classList.add('_active');
			e.preventDefault();
		});
	}
}
//=================
//Spollers
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {

	function spollerCLick(e) {
		const spoller = e.target;
		if (spollersGo) {
			spollersGo = false;

			if (spoller.closest('._spollers').classList.contains('_one')) {
				let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
				for (let i = 0; i < curent_spollers.length; i++) {
					let el = curent_spollers[i];
					if (el != spoller) {
						el.classList.remove('_active');
						_slideUp(el.nextElementSibling, 500);
					}
				}
			}
			spoller.classList.toggle('_active');
			_slideToggle(spoller.nextElementSibling, 500);

			setTimeout(function () {
				spollersGo = true;
			}, 500);
		}
	}
	function spollersInit() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			let spollerMax = spoller.getAttribute('data-max');

			if (spollerMax && window.innerWidth > spollerMax) {
				if (spoller.classList.contains('_init')) {
					spoller.classList.remove('_active');
					spoller.classList.remove('_init');
					spoller.nextElementSibling.style.cssText = '';
					spoller.removeEventListener("click", spollerCLick);
				}
			} else if (!spoller.classList.contains('_init')) {
				spoller.classList.add('_init');
				spoller.addEventListener("click", spollerCLick);
			}
		}
	}
	function spollersShowActive() {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];
			if (spoller.classList.contains('_active')) {
				_slideToggle(spoller.nextElementSibling, 500);
			}
		}
	}
	window.addEventListener("resize", spollersInit);

	setTimeout(function () {
		spollersShowActive();
		spollersInit();
	}, 0);
}
//=================
//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('data-popup');
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
			popup_close(e.target.closest('.popup'), true);
		}
	});
}
function popup_open(item, video) {
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
function popup_close(item, bodyUnlock) {
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
			popup_close(el.closest('.popup'), true);
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================
//SlideToggle
let _slideUp = function (target, duration) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(function () {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = function (target, duration) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(function () {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = function (target, duration) {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================
//Wrap
function _wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
//========================================
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

//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];
		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}

//Placeholder
const placeholderParents = document.querySelectorAll('._placeholder-parent');
if (placeholderParents.length > 0) {
	for (let i = 0; i < placeholderParents.length; i++) {
		const placeholderParent = placeholderParents[i];
		const input = placeholderParent.querySelector('input');
		const placeholder = placeholderParent.querySelector('._placeholder');

		input.addEventListener('focus', function (e) {
			placeholder.classList.add('_hidden');
		})
		input.addEventListener('input', function (e) {
			placeholder.classList.add('_hidden');
		})
		input.addEventListener('blur', function (e) {
			if (e.target && e.target.value.trim() === '')
				placeholder.classList.remove('_hidden');
		})
	}
}