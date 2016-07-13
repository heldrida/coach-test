var config = require('./config');
var helper = require('./helper');
var MyMap = require('./map');
var List = require('./list');
var coachService = require('./coachService');

function App() {
	this.init();
}

App.prototype = {

	init: function () {

		this.setVars();
		this.setEventListeners();

	},

	setVars: function () {

		var commonParams = {
			autoload: true,
			coachService: coachService
		};
		
		this.map = new MyMap(commonParams);
		this.list = new List(commonParams);

	},

	setEventListeners: function () {


	}

};

window.app = new App();