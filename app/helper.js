module.exports = {

	loadScript: function (params) {

		var promise = new Promise(function (resolve, reject) {

			var s, r, t;
			r = false;
			s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = params.src;
			s.setAttribute('id', 'gmap');
			s.onload = s.onreadystatechange = function() {
				//console.log( this.readyState ); //uncomment this line to see which ready states are called.
				if ( !r && (!this.readyState || this.readyState == 'complete') ) {
					r = true;
					params.onSuccess();
					resolve("Success!");
				} else {
					params.onFailure();
					reject(Error("Error message!"));
				}
			};
			t = document.getElementsByTagName('script')[0];
			t.parentNode.insertBefore(s, t);

		});

		return promise;
	},

	triggerEvent: function (name) {
		window.dispatchEvent(new Event(name));
	}

};