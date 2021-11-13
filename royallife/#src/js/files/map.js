/* Map */
function mapAdd() {
	let tag = document.createElement('script');
	tag.src = "https://maps.google.com/maps/api/js?sensor=false&amp;key=&callback=mapInit";
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