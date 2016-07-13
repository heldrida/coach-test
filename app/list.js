var config = require('./config');

function List (params) {
	this.setVars(params);
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

		this.coachService = params.coachService.getInstance();

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
			console.log(data[i]);
	 		if (typeof data[i] !== 'undefined') {
	 			var busName = data[i].nationalcoachcode.slice(-3) + ' ' + data[i].name;
		 		var newNode = createEl(busName);
				document.querySelector('.pure-menu-list').appendChild(newNode);

				// todo: count number of occurrences
				// for any matches, add incremental value to the name
				listed.push(busName);

	 		}

		}

	},

};

module.exports = List;