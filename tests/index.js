var config = require('../app/config.js');
var helper = require('../app/helper');
var MyMap = require('../app/map.js');
var List = require('../app/list.js');
var coachService = require('../app/coachService');
var testData = [{"ospoint":{"type":"Point","crs":{"type":"name","properties":{"name":"EPSG27700"}},"coordinates":[527910.0,182032.0]},"nationalcoachcode":"900057378M","name":"Baker Street","latlong":{"type":"Point","crs":{"type":"name","properties":{"name":"EPSG4326"}},"coordinates":[-0.15771316479289943,51.522728429703754]},"distance":1808.643795502,"atcocode":"490000011B"}];

describe("Google map script generator", function () {

	var onSuccess, onFailure, request;
	var myMap = new MyMap({ autoload: false, coachService: coachService });

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

describe("Coach service", function () {
	var cs;
	beforeEach(function () {
		cs = coachService.getInstance();
	});
	it("there's only one instance", function () {
		var cs_b = coachService.getInstance();
		expect(cs).toEqual(cs_b);
	});
	it("the api datas etter should json parse and validate the key", function () {
	    expect(cs.set('{"success":true,"result":[]}')).toBe(true);
	});
	it("the api data getter should return an object", function () {
	    expect(cs.get()).toEqual(jasmine.any(Object));
	});
	it("the marker setter should set a coachnumber to a unique marker", function () {
		expect(cs.setMarkerByCode(909, {})).toBe(true);
		expect(cs.setMarkerByCode(909, {})).not.toBe(true);
	});
	it("the marker getter should return an object", function () {
		expect(cs.getMarkerByCode(909)).toEqual({});
	});
});