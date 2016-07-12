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
				onSuccess: null,
				onFailure: null
			});
		}

	},

	setVars: function (params) {

		this.coachService = params.coachService.getInstance();
		console.log(this.coachService);
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
			}.bind(this);

			xhr.send(null);

		}.bind(this));

		return promise;

	}

};

module.exports = List;