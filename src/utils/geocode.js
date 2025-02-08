const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(address)}.json?key=gZ1iJNxavLcGBQQLWx2u&limit=1`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the location service!", undefined);
        } else if (response.body.features.length === 0) {
            callback("Unable to find the location.", undefined);

        } else {
            callback(undefined, {
                    longitude: response.body.features[0].center[0],
                    latitude: response.body.features[0].center[1],
                    location: response.body.features[0].place_name
                })
                // console.log(response.body.features[0].center)

        }
    })

}

module.exports = geocode;