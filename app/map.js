function Map () {
	this.init();
}

Map.prototype = {
	init: function () {
		this.mapContainer = document.getElementById('myMap');
	},

	initMap: function () {
		map = new google.maps.Map(this.mapContainer, {
			center: {lat: -34.397, lng: 150.644},
			zoom: 8
		});
	}
};

module.exports = Map;