var config = require('../app/config.js');
var helper = require('../app/helper');
var App = require('../app/app.js');
var MyMap = require('../app/map.js');
var List = require('../app/list.js');

// configuration file
describe("The configuration file", function () {
  it("contains the correct api point", function () {
    expect(config.api).toBe('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=WC1E%207BL&distance=3');
  });
});

// google maps ajax request
describe("The Google Maps Ajax request", function () {

	beforeEach(function () {
		jasmine.Ajax.install();
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
	});

    it("verify if the app, is initialised with the gmap url call", function () {

		var callback = jasmine.createSpy("success");

		// var xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = function () {
		// 	if (this.readyState == this.DONE) {
		// 		callback(this.responseText);
		// 	}
		// };

		// xhr.open("GET", config.api);
		// xhr.send();

		var myMap = new MyMap();

		expect(jasmine.Ajax.requests.mostRecent().url).toBe(config.googleMapsUrl);
		expect(callback).not.toHaveBeenCalled();

	});

});

// transport request handler
describe("The transport data request handler", function () {

	beforeEach(function () {
		jasmine.Ajax.install();
	});

	afterEach(function () {
		jasmine.Ajax.uninstall();
	});

	it("verify if the url is the correct", function () {

		var list = new List();
		var callback = jasmine.createSpy("success");
		expect(jasmine.Ajax.requests.mostRecent().url).toBe(config.api);
		expect(callback).not.toHaveBeenCalled();

	});

});