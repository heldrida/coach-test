var config = require('../app/config.js');
var helper = require('../app/helper');
var App = require('../app/app.js');
var MyMap = require('../app/map.js');
var List = require('../app/list.js');

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