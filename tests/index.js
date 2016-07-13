var config = require('../app/config.js');
var helper = require('../app/helper');
var App = require('../app/app.js');
var MyMap = require('../app/map.js');
var List = require('../app/list.js');
var coachService = require('../app/coachService');
var testData = [{"ospoint":{"type":"Point","crs":{"type":"name","properties":{"name":"EPSG27700"}},"coordinates":[527910.0,182032.0]},"nationalcoachcode":"900057378M","name":"Baker Street","latlong":{"type":"Point","crs":{"type":"name","properties":{"name":"EPSG4326"}},"coordinates":[-0.15771316479289943,51.522728429703754]},"distance":1808.643795502,"atcocode":"490000011B"}];

describe("Google map script generator", function () {

	var onSuccess, onFailure, request;
	var myMap = new MyMap({ autoload: false });

	beforeEach(function() {
		spyOn(myMap, "load").and.callFake(function () {
			myMap.loaded = true;
			return myMap.loaded;
		});

		onSuccess = jasmine.createSpy('onSuccess');
		onFailure = jasmine.createSpy('onFailure');

		myMap.load({
			src: config.googleMapsUrl,
			onSuccess: onSuccess,
			onFailure: onFailure
		});

	});

	it("should load the map", function () {
		expect(myMap.load).toHaveBeenCalled();
		expect(myMap.loaded).toEqual(true);
	});

});

describe("The List object", function () {

	var list, request;

	beforeEach(function () {
		jasmine.Ajax.install();
		jasmine.Ajax.stubRequest(config.api).andReturn({
			responseText: [{}]
		});
		list = new List({ autoload: true, coachService: coachService });
		request = jasmine.Ajax.requests.mostRecent();

	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	it('should request the Data from the API', function() {
		expect(request.url).toBe(config.api);
		expect(request.method).toBe('GET');
	});

});

// describe("The List element generator", function () {

// 	var list;

// 	beforeEach(function () {
// 		list = new List({ autoload: false, coachService: coachService });
// 		list.generate(testData);
// 	});

// 	it('should generate DOM elements', function () {
// 		expect(document.querySelectorAll('.pure-menu-item').length).toBe(1);
// 	});

// });