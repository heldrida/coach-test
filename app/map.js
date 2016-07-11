var config = require('./config');
var helper = require('./helper');

function Map () {
	this.init();
}

Map.prototype = {
	init: function () {
		this.mapContainer = document.getElementById('myMap');

		this.setVars();
		this.setEventListeners();

		helper.loadScript(config.googleMapsUrl, function () {
			console.log('GMap requested!');
			helper.triggerEvent(this.mapEventInitName);
		}.bind(this));

	},

	setVars: function () {

		this.mapEventInitName = 'init_google_map';


	},

	setEventListeners: function () {

		window.addEventListener(this.mapEventInitName, this.initMap.bind(this));

	},

	initMap: function () {
		map = new google.maps.Map(this.mapContainer, {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
	}

};

module.exports = Map;