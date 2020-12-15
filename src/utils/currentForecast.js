const request = require('request')


const forecast = (lat, lon, callback) => {


    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=ca622be62722f5ec8164f3197a4d2c71'

    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.message) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                temperature: response.body.list[0].main.temp,
                feelslike: response.body.list[0].main.feels_like,
                pressure: response.body.list[0].main.pressure,
                temp_min: response.body.list[0].main.temp_min,
                temp_max: response.body.list[0].main.temp_max,
                weatherDescription: response.body.list[0].weather[0].main,
                img: response.body.list[0].weather[0].id,
                windDir: response.body.list[0].wind.deg,
                wind: response.body.list[0].wind.speed,
                humidity: response.body.list[0].main.humidity,
                name: response.body.city.name,
                country: response.body.city.country
            })
        }

    })
}


module.exports = forecast