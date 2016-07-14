var config = require('./config');

function List (params) {
	this.setVars(params);
	this.setEventListeners();
	var promise = this.init(params);
	return promise;
}

List.prototype = {
	init: function (params) {

		if (typeof params.autoload !== 'undefined' && params.autoload) {
			return this.requestData({
				url: config.api,
				onSuccess: function () {
					var data = this.coachService.get();
					this.generate(data);
				}.bind(this),
				onFailure: null
			});
		}

		this.pureMenuList = document.querySelector('.pure-menu-list');

	},

	setVars: function (params) {

		this.imagination = document.querySelector('.imagination');
		this.coachService = params.coachService.getInstance();

	},

	setEventListeners: function () {

		if (typeof this.imagination !== 'undefined' && this.imagination) {
			console.log("this.imagination", this.imagination);
			this.imagination.addEventListener('click', function () {
				var marker = this.coachService.getMarkerByCode('imagination');
				new google.maps.event.trigger(marker, 'click');
			}.bind(this));
		}

	},

	requestData: function (params) {

		var xhr = new XMLHttpRequest();
		var promise = new Promise(function (resolve, reject) {

			xhr.open("GET", params.url, true);

			xhr.onreadystatechange = function (ev) {

				if (xhr.readyState === 4) {

					if (xhr.status === 200) {

						var data = xhr.responseText;

						this.coachService.set(data);

						if (typeof params.onSuccess === 'function') {

							params.onSuccess();
						}

						resolve(xhr.responseText);

					} else {

						if (typeof params.onFailure === 'function') {

							params.onFailure();

						}

						reject(Error(xhr.statusText));

					}
				}
			}.bind(this);

			xhr.send(null);

		}.bind(this));

		return promise;

	},

	generate: function (data) {

		var createEl = function (name) {
			
			var li = document.createElement('li');
			var a = document.createElement('a');
			var txt = document.createTextNode(name);
			a.setAttribute('class', 'pure-menu-link');
			a.appendChild(txt);
			li.appendChild(a);
			li.setAttribute('class', 'pure-menu-item');

			return li;

		};
		
		var listed = [];

		// order by distance
		data.sort(function(a, b) {
			return a.distance > b.distance;
		});

		for (var i = 0, c = 0; i <= data.length; i++) {

	 		if (typeof data[i] !== 'undefined') {
	 			var coachcode = data[i].nationalcoachcode;
	 			var busName = data[i].nationalcoachcode.slice(-3) + ' ' + data[i].name;
		 		var newNode = createEl(busName);

		 		newNode.addEventListener('click', function (coachcode) {
		 			var marker = this.coachService.getMarkerByCode(coachcode);
					new google.maps.event.trigger( marker, 'click' );
		 		}.bind(this, coachcode));

				document.querySelector('.pure-menu-list').appendChild(newNode);

				listed.push(busName);

	 		}

		}

	},

};

module.exports = List;