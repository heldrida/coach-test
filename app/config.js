var distance = 3,
	postcode =  'WC1E%207BL',
	queryParams = 'postcode=' + postcode + '&distance=' + distance,
	apiKey = require('../api_keys').google_map_api,
	callbackName = '';

module.exports = {
	api: 'https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?' + queryParams,
	googleMapsUrl: 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=' + callbackName
}