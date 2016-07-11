var helper = require('./helper');
var config = require('./config');
var MyMap = require('./map');
var List = require('./list');

function App() {
	this.init();
}

App.prototype = {

	init: function () {

		this.setVars();
		this.setEventListeners();

		helper.loadScript(config.googleMapsUrl, function () {
			console.log('app.js loaded!');
			helper.triggerEvent(this.mapEventInitName);
		}.bind(this));

	},

	setVars: function () {

		this.mapEventInitName = 'init_google_map';
		this.map = new MyMap();
		this.list = new List();

	},

	setEventListeners: function () {

		window.addEventListener(this.mapEventInitName, this.initGoogleMap.bind(this));

	},

	initGoogleMap: function () {

		this.map.initMap();

	}

};

window.app = new App();