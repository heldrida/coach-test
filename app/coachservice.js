var coachService = (function () {

	var instance;

	function init() {

		var data = [];

		return {

			get: function () {
				return data;
			},

			set: function(res) {
				var myData = JSON.parse(res);
				data = myData.result;
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