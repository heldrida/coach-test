function List (params) {
	this.init(params);
}

List.prototype = {
	init: function (params) {
		if (typeof params.autoload !== 'undefined' && params.autoload) {
			var config = require('./config');
			this.requestData({
				url: config.api,
				onSuccess: null,
				onFailure: null
			});
		}
	},

	requestData: function (params) {

		var xhr = new XMLHttpRequest();
		var promise = new Promise(function (resolve, reject) {

			xhr.open("GET", params.url, true);

			xhr.onreadystatechange = function (ev) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						console.log(xhr.responseText);
						if (typeof params.onSuccessCallback === 'function') {
							params.onSuccess();
						}
						resolve(xhr.responseText);
					} else {
						if (typeof params.onFailureCallback === 'function') {
							params.onFailure();
						}
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