const request = require('request')

const fiveDayForecast = (latitude, longitude, callback) => {

    const url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=ca622be62722f5ec8164f3197a4d2c71'

    request({
        url,
        json: true
    }, (error, response) => {

        if (error) {
            callback('Cannot connect to the server,try again later', undefined)
        } else if (response.body.cod === "404") {
            callback('Cannot connect to the server,try again later', undefined)
        } else {
            const main = []
            const weather = []
            const date = []
            let mainWeather = []

            const forecast = response.body.list

            for (let i = 0; i < forecast.length; i++) {
                if (forecast[i].dt_txt.includes("12:00")) {
                    //Ubacuje objekat gde je temperatura
                    main.push(forecast[i].main)
                    //Ubacuje objekat gde je staus id vremenske ikonice i opis vremena
                    weather.push(forecast[i].weather[0])

                    //kreiranje imena datuma koji se izvlaci iz liste
                    const datum = new Date(forecast[i].dt_txt)
                    var weekday = [];
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var day = weekday[datum.getDay()];
                    date.push(day)
                }
            }

            for (let i = 0; i < weather.length; i++) {

                let obj = {
                    img_id: weather[i].id,
                    des: weather[i].description,
                    temp: main[i].temp,
                    day: date[i]
                }
                //kreiranje niza sa podacima vremenske prognoze za narednih pet dana
                mainWeather.push(obj)
            }
            callback(undefined, mainWeather)
            //console.log(mainWeather)

            
        }

    })





}

module.exports = fiveDayForecast