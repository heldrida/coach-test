function List () {
	this.init();
}

List.prototype = {
	init: function () {
		var config = require('./config');
		this.requestData(config.api);
	},

	requestData: function (url) {

		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function (ev) {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.responseText);
				} else {
					console.log("Error", xhr.statusText);
				}
			}
		};
		xhr.send(null);

	}

};

module.exports = List;