var coachService = (function () {

	var instance;

	function init() {

		var data = [];

		return {

			get: function () {
				return data;
			},

			set: function(myData) {
				data = myData;
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