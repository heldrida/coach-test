/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);
	var helper = __webpack_require__(3);
	var MyMap = __webpack_require__(4);
	var List = __webpack_require__(5);
	var coachService = __webpack_require__(6);

	function App() {
		this.init();
	}

	App.prototype = {

		init: function () {

			this.setVars();
			this.setEventListeners();

		},

		setVars: function () {

			this.list = new List({
				autoload: true,
				coachService: coachService
			}).then(function () {
				
				this.map = new MyMap({
					autoload: true,
					coachService: coachService
				});

			}.bind(this));

		},

		setEventListeners: function () {


		}

	};

	window.app = new App();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var distance = 3,
		postcode =  'WC1E%207BL',
		queryParams = 'postcode=' + postcode + '&distance=' + distance,
		apiKey = __webpack_require__(2).google_map_api,
		callbackName = '';

	module.exports = {
		api: 'https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?' + queryParams,
		googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=' + callbackName
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
		google_map_api: 'AIzaSyAVV1VYzcGd8ZpNV5qqx18C9riJgfabQv8'
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);
	var helper = __webpack_require__(3);

	function Map (params) {
		this.params = params;
		this.init(params);
	}

	Map.prototype = {
		init: function (params) {
			
			this.map;
			this.markers = [];
			this.coachService = params.coachService.getInstance();

			this.loaded = false;
			this.mapContainer = document.getElementById('myMap');

			this.setVars();
			this.setEventListeners();

			if(typeof params.autoload !== 'undefined' && params.autoload) {
				this.load({
					src: config.googleMapsUrl,
					onSuccess: this.onSucessHandler.bind(this),
					onFailure: this.onFailureHandler.bind(this)
				});
			}

		},

		setVars: function () {

			this.mapEventInitName = 'init_google_map';

		},

		setEventListeners: function () {

			window.addEventListener(this.mapEventInitName, this.initMap.bind(this));

		},

		onSucessHandler: function () {
			this.loaded = true;
			helper.triggerEvent(this.mapEventInitName);
		},

		onFailureHandler: function () {
			console.log('onFailure callback!');
		},

		load: function (params) {

			return helper.loadScript(params);

		},

		initMap: function () {
			this.map = new google.maps.Map(this.mapContainer, {
				center: {lat: -34.397, lng: 150.644},
				zoom: 8
			});
			// place markers
			var c = this.params.coachService.getInstance();
			var data = c.get();
			this.placeMarkers(data);
			this.placeImaginationMarker();
		},

		placeMarkers: function (data) {
			var infowindow = new google.maps.InfoWindow({
				content: ''
			});
			for (var i = 0; i <= data.length; i++) {

				if (typeof data[i] !== 'undefined') {

		 			var busName = data[i].nationalcoachcode.slice(-3) + ' ' + data[i].name;
					var myLatLng = {lat: data[i]['latlong']['coordinates'][1], lng: data[i]['latlong']['coordinates'][0] };
					var marker = new google.maps.Marker({
						position: myLatLng,
						map: this.map,
						title: busName,
						icon: 'images/icon-coaches.png'
					});

					// show info window on click for highlight
					(function (map, marker, busName) {
						marker.addListener('click', function () {
							map.setZoom(16);
							map.panTo(marker.position);
							infowindow.setContent('<div class="infowindow"><span>Coach:</span> ' + busName + '</div>');
							infowindow.open(map, marker);
						});
					}(this.map, marker, busName));

					this.markers.push(marker);
					this.coachService.setMarkerByCode(data[i].nationalcoachcode, marker);

				}

			}

			this.map.setZoom(13);
			this.map.setCenter(this.markers[0].getPosition());
		},

		placeImaginationMarker: function () {
			var infowindow = new google.maps.InfoWindow({
				content: ''
			});
			var myLatLng = { lat: 51.5192201, lng: -0.1318654 };
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: this.map,
				title: 'Imagination',
				icon: 'images/icon-black.png'
			});
			marker.addListener('click', function () {
				this.map.setZoom(16);
				this.map.panTo(marker.position);
				infowindow.setContent('<div class="infowindow imagination">Imagination</div>');
				infowindow.open(this.map, marker);
			}.bind(this));
		}

	};

	module.exports = Map;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(1);

	function List (params) {
		this.setVars(params);
		var promise = this.init(params);
		return promise;
	}

	List.prototype = {
		init: function (params) {

			if (typeof params.autoload !== 'undefined' && params.autoload) {
				return this.requestData({
					url: config.api,
					onSuccess: function () {
						var data = this.coachService.get();
						this.generate(data);
					}.bind(this),
					onFailure: null
				});
			}

			this.pureMenuList = document.querySelector('.pure-menu-list');

		},

		setVars: function (params) {

			this.coachService = params.coachService.getInstance();

		},

		requestData: function (params) {

			var xhr = new XMLHttpRequest();
			var promise = new Promise(function (resolve, reject) {

				xhr.open("GET", params.url, true);

				xhr.onreadystatechange = function (ev) {

					if (xhr.readyState === 4) {

						if (xhr.status === 200) {

							var data = xhr.responseText;

							this.coachService.set(data);

							if (typeof params.onSuccess === 'function') {

								params.onSuccess();
							}

							resolve(xhr.responseText);

						} else {

							if (typeof params.onFailure === 'function') {

								params.onFailure();

							}

							reject(Error(xhr.statusText));

						}
					}
				}.bind(this);

				xhr.send(null);

			}.bind(this));

			return promise;

		},

		generate: function (data) {

			var createEl = function (name) {
				
				var li = document.createElement('li');
				var a = document.createElement('a');
				var txt = document.createTextNode(name);
				a.setAttribute('class', 'pure-menu-link');
				a.appendChild(txt);
				li.appendChild(a);
				li.setAttribute('class', 'pure-menu-item');

				return li;

			};
			
			var listed = [];

			// order by distance
			data.sort(function(a, b) {
				return a.distance > b.distance;
			});

			for (var i = 0, c = 0; i <= data.length; i++) {

		 		if (typeof data[i] !== 'undefined') {
		 			var coachcode = data[i].nationalcoachcode;
		 			var busName = data[i].nationalcoachcode.slice(-3) + ' ' + data[i].name;
			 		var newNode = createEl(busName);

			 		newNode.addEventListener('click', function (coachcode) {
			 			var marker = this.coachService.getMarkerByCode(coachcode);
						new google.maps.event.trigger( marker, 'click' );
			 		}.bind(this, coachcode));

					document.querySelector('.pure-menu-list').appendChild(newNode);

					listed.push(busName);

		 		}

			}

		},

	};

	module.exports = List;

/***/ },
/* 6 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);