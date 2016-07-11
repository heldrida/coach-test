function List (params) {
	this.init(params);
}

List.prototype = {
	init: function (params) {
		if (typeof params.autoload !== 'undefined' && params.autoload) {
			var config = require('./config');
			this.requestData(config.api);
		}
	},

	requestData: function (url) {

		var promise = new Promise(function (resolve, reject) {

			var xhr = new XMLHttpRequest();

			xhr.open("GET", url, true);

			xhr.onreadystatechange = function (ev) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log(xhr.responseText);
						resolve(xhr.responseText);
					} else {
						reject(Error(xhr.statusText));
					}
				}
			};

			xhr.send(null);

		});

		return promise;

	}

};

module.exports = List;