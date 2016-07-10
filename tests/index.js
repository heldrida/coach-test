var config = require('../app/config.js');

// configuration file
describe("The configuration file", function() {
  it("contains the correct api point", function() {
    expect(config.api).toBe('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=WC1E%207BL&distance=3');
  });
});

// google maps ajax request
describe("The Google Maps Ajax request", function() {
	
	beforeEach(function() {
		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

    it("specifying response when you need it", function() {

		var callback = jasmine.createSpy("success");

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (this.readyState == this.DONE) {
				callback(this.responseText);
			}
		};

		xhr.open("GET", config.api);
		xhr.send();

		expect(jasmine.Ajax.requests.mostRecent().url).toBe(config.api);
		expect(callback).not.toHaveBeenCalled();

	});

});