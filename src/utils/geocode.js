const request = require('request')

const geocode = (address, callback) => {

        const url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(address) + '&units=metric&cnt=1&appid=ca622be62722f5ec8164f3197a4d2c71'
  

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.cod === "404") {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.city.coord.lat,
                latitude: response.body.city.coord.lon,
                name: response.body.city.name,
                country: response.body.city.country
            })
            
        }
    })
}

module.exports = geocode