var config = require('./config');
var helper = require('./helper');
var MyMap = require('./map');
var List = require('./list');

function App() {
	this.init();
}

App.prototype = {

	init: function () {

		this.setVars();
		this.setEventListeners();

	},

	setVars: function () {

		this.map = new MyMap({ autoload: true });
		this.list = new List();

	},

	setEventListeners: function () {


	}

};

window.app = new App();