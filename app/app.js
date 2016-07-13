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

		this.list = new List({
			autoload: true,
			coachService: coachService
		}).then(function () {
			
			this.map = new MyMap({
				autoload: true,
				coachService: coachService
			});

		}.bind(this));

	},

	setEventListeners: function () {


	}

};

window.app = new App();