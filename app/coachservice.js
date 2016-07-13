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
				var myData = JSON.parse(res);
				data = myData.result;
			},

			getMarkersByCode: function () {
				return markersByCode;
			},

			setMarkerByCode: function (code, marker) {
				markersByCode[code] = marker;
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