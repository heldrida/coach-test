var config = require('./config');
var helper = require('./helper');

function Map (params) {
	this.init(params);
}

Map.prototype = {
	init: function (params) {
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

		return helper.loadScript(params).then(function () {
			console.log("loadscript completed!");
		});

	},

	initMap: function () {
		map = new google.maps.Map(this.mapContainer, {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
	}

};

module.exports = Map;