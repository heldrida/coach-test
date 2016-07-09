var distance = 3,
	postcode =  'WC1E%207BL',
	queryParams = 'postcode=' + postcode + '&distance=' + distance;

module.exports = {
	api: 'https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?' + queryParams
}