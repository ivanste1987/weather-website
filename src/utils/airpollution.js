const request = require('request')




const airpollution = (lat, lon, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/air_pollution?lat='+ lat +'&lon='+ lon +'&units=metric&appid=ca622be62722f5ec8164f3197a4d2c71'


    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            callback('Cant reach server, please try another time.', undefined)
        } else if (response.body.length === 0) {
            callback('City is not found, try another search.', undefined)
        } else {
            callback(undefined, {
                co: response.body.list[0].components.co,
                no: response.body.list[0].components.no,
                no2: response.body.list[0].components.no2,
                o3: response.body.list[0].components.o3,
                so2: response.body.list[0].components.so2,
                pm2_5: response.body.list[0].components.pm2_5,
                pm10: response.body.list[0].components.pm10,
                nh3: response.body.list[0].components.nh3
            })


        }
    })
}


module.exports = airpollution