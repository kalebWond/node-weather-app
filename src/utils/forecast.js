const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const key = 'ec1068ce8f5003da21be949519b52ffb';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`

    request({ url, json: true }, (error, {body}={} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.cod != 200) {
            callback(body.message, undefined)
        } else {
            callback(undefined, `It's ${body.weather[0].description}. 
                It is currently ${parseInt(body.main.temp) - 273} degrees out.
                The low temperature is ${parseInt(body.main.temp_min) - 273} and the high is ${parseInt(body.main.temp_max) - 273}`)
        }
    })
}

module.exports = forecast