function initMap() {
  var pos = {lat: 59.914661, lng: 30.436098};
  var opt = {
    center: pos,
    zoom: 15,
    styles: [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "weight": "2.00"
            }
            ]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#9c9c9c"
            }
            ]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [
            {
                "visibility": "on"
            }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
            {
                "color": "#f2f2f2"
            }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#ffffff"
            }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#ffffff"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#eeeeee"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#7b7b7b"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#ffffff"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
            {
                "visibility": "simplified"
            }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
            {
                "visibility": "off"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
            {
                "color": "#c8d7d4"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#070707"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#ffffff"
            }
            ]
        }
    ]
}

var myMap = new google.maps.Map(document.getElementById("map"), opt);

var marker = new google.maps.Marker({
    position: pos,
    map: myMap,
    title: "Текст при наведении",
    icon: 'img/icons/location.png'
});

  //Информационное окно
var info = new google.maps.InfoWindow({
  content: '<h3>bla-bla</h3><p>Description</p>'
});

marker.addListener("click", function() {
  info.open(myMap, marker);
});


}