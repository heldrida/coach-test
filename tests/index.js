var config = require('../app/config.js');

describe("The configuration file", function() {
  it("contains the correct api point", function() {
    expect(config.api).toBe('https://data.gov.uk/data/api/service/transport/naptan_coach_stations/postcode?postcode=WC1E%207BL&distance=3');
  });
});