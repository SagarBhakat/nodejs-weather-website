const request = require('postman-request');
const forecast = (latitude, longitude, callback) => {

    const url = `https://api.weatherstack.com/current?access_key=7f3959524a678b4b197aa5cb5fc7b3e9&query=${latitude},${longitude}`;
    // const url = `https://api.weatherstack.com/current?access_key=ca9316d2433f2ed59d5e2cca8f3ec163&query=23.370050140178243,85.32503843307495`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if (response.body.error) {
            callback("Unable to find the location!", undefined);

        } else {
            const temp = response.body.current.temperature;
            const feelslike = response.body.current.feelslike;
            // console.log(temp);
            // console.log(feelslike);

            callback(undefined, `It is currently ${temp} degrees out. It feels like ${feelslike} degrees out.`

            )
        }

    })
}


module.exports = forecast;