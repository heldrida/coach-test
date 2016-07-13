var config = require('./config');
var helper = require('./helper');

function Map (params) {
	this.params = params;
	this.init(params);
}

Map.prototype = {
	init: function (params) {
		
		this.map;
		this.markers = [];
		this.coachService = params.coachService.getInstance();

		this.loaded = false;
		this.mapContainer = document.getElementById('myMap');

		this.setVars();
		this.setEventListeners();

		if(typeof params.autoload !== 'undefined' && params.autoload) {
			this.load({
				src: config.googleMapsUrl,
				onSuccess: this.onSucessHandler.bind(this),
				onFailure: this.onFailureHandler.bind(this)
			});
		}

	},

	setVars: function () {

		this.mapEventInitName = 'init_google_map';

	},

	setEventListeners: function () {

		window.addEventListener(this.mapEventInitName, this.initMap.bind(this));

	},

	onSucessHandler: function () {
		this.loaded = true;
		helper.triggerEvent(this.mapEventInitName);
	},

	onFailureHandler: function () {
		console.log('onFailure callback!');
	},

	load: function (params) {

		return helper.loadScript(params);

	},

	initMap: function () {
		this.map = new google.maps.Map(this.mapContainer, {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
		// place markers
		var c = this.params.coachService.getInstance();
		var data = c.get();
		this.placeMarkers(data);
	},

	placeMarkers: function (data) {

		for (var i = 0; i <= data.length; i++) {
			if (typeof data[i] !== 'undefined') {
				var myLatLng = {lat: data[i]['latlong']['coordinates'][1], lng: data[i]['latlong']['coordinates'][0] };
				var marker = new google.maps.Marker({
					position: myLatLng,
					map: this.map,
					title: data[i].name
				});
				this.markers.push(marker);
				this.coachService.setMarkerByCode(data[i].nationalcoachcode, marker);
			}
		}

		this.map.setZoom(12);
		this.map.setCenter(this.markers[this.markers.length - 1].getPosition());
	}

};

module.exports = Map;