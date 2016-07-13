var config = require('./config');

function List (params) {
	this.setVars(params);
	this.init(params);
}

List.prototype = {
	init: function (params) {

		if (typeof params.autoload !== 'undefined' && params.autoload) {

			this.requestData({
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

		for (var i = 0, c = 0; i <= data.length; i++) {

	 		if (typeof data[i] !== 'undefined') {

		 		var newNode = createEl(data[i].name);
				this.pureMenuList.appendChild(newNode);

				// todo: count number of occurrences
				// for any matches, add incremental value to the name
				listed.push(data[i].name);

	 		}

		}

	},

};

module.exports = List;