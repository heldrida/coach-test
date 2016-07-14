var coachService = (function () {

	var instance;
	var markersByCode = {};

	function init() {

		var data = [];

		return {

			get: function () {
				return data;
			},

			set: function(res) {
				var status = false;
				var myData = JSON.parse(res);
				if (typeof myData.result !== 'undefined') {
					data = myData.result;
					status = true;
				}
				return status;
			},

			getMarkersByCode: function () {
				return markersByCode;
			},

			getMarkerByCode: function (code) {
				return typeof markersByCode[code] !== 'undefined' ? markersByCode[code] : false;
			},

			setMarkerByCode: function (code, marker) {
				var status = false;
				if (typeof markersByCode[code] === 'undefined') {
					markersByCode[code] = marker;
					status = true;
				}
				return status;
			}

		};

	};

	return {

		getInstance: function () {

			if ( !instance ) {
				instance = init();
			}

			return instance;

		}

	};

})();

module.exports = coachService;