var loadScript = require('./helper');
var config = require('./config');
var Map = require('./map');
var List = require('./list');

function App() {
	this.init();
}

App.prototype = {
	init: function () {
		
		this.map = new Map();

		loadScript(config.googleMapsUrl, function () {
	
			console.log('app.js loaded!');

		}.bind(this));
	
	}
};

window.app = new App();