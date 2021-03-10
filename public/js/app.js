const weatherForm = document.querySelector('form')
const address = document.querySelector('#address')
const error = document.querySelector('.error')


window.onload = () => {
    defaultLocation()
    getLocation()
}

// Smisliti nesto drugo za ovo!!!!!!!!!
const getImage = (number) => {

    const cloud = [801, 802, 803, 804]
    const atmosphere = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781]
    const snow = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
    const rain = [500, 501, 502, 503, 504, 511, 520, 521, 522, 531]
    const drizzle = [300, 301, 302, 310, 311, 312, 313, 314, 321]
    const thunderstorm = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]

    if (number === 800) {
        return '/img/animated/day.svg'
    }
    for (let i = 0; i < cloud.length; i++) {
        if (number === cloud[i]) {
            return '/img/animated/cloudy.svg'
        }
    }
    for (let i = 0; i < atmosphere.length; i++) {
        if (number === atmosphere[i]) {
            return '/img/animated/cloudy.svg'

        }
    }
    for (let i = 0; i < snow.length; i++) {
        if (number === snow[i]) {
            return '/img/animated/snowy-5.svg'
        }
    }
    for (let i = 0; i < rain.length; i++) {
        if (number === rain[i]) {
            return '/img/animated/rainy-6.svg'
        }
    }
    for (let i = 0; i < drizzle.length; i++) {
        if (number === drizzle[i]) {
            return '/img/animated/rainy-7.svg'
        }
    }
    for (let i = 0; i < thunderstorm.length; i++) {
        if (number === thunderstorm[i]) {
            return '/img/animated/thunder.svg'
        }
    }

}

const defaultLocation = () => {
    axios.get('/weather/default').then((response) => {
        error.innerHTML = 'Loading'
        if (response.data.error) {
            error.innerHTML = response.data.error
        } else {

            error.innerHTML = ''
            document.getElementById("temperature").innerHTML = Math.round(response.data.temperature) + '&#x2103;'
            //Location
            document.getElementById("city").innerHTML = response.data.name + ", " + response.data.country;

            //Weather temperature
            document.getElementById("fellslike").innerHTML = "Feelslike " + Math.round(response.data.feelslike) + '&#x2103;'
            document.getElementById("windspeed").innerHTML = "Wind Speed " + Math.round(response.data.wind) + " km/h"
            document.getElementById("weatherDescription").innerHTML = response.data.weatherDescription
            document.getElementById("pressure").innerHTML = "Prssure " + response.data.pressure + " mb"
            document.getElementById("weatherImage").src = getImage(response.data.img);
            document.getElementById("windDirection").innerHTML = "Wind Direcrtion " + response.data.windDir;
            document.getElementById("humidity").innerHTML = "Humidity " + response.data.humidity + " %";
            document.getElementById("temp_max").innerHTML = "H " + Math.round(response.data.temp_max) + '&#x2103; |';
            document.getElementById("temp_min").innerHTML = " L " + Math.round(response.data.temp_min) + '&#x2103;';

            //Air Pollution
            // document.getElementById("pm25").innerHTML = "PM2.5 " + response.data.pm2_5
            // document.getElementById("pm10").innerHTML = "PM10 " + response.data.pm10
            // document.getElementById("no2").innerHTML = "NO2 " + response.data.no2
            // document.getElementById("so2").innerHTML = "SO2 " + response.data.so2
            // document.getElementById("co").innerHTML = "CO " + response.data.co
            // document.getElementById("pollution").innerHTML = response.data.co

            let element = document.getElementById("fortcastFiveDaysContainer")
            let container = document.createElement('DIV')
            container.setAttribute("id", "container")

            for (let i in response.data.fiveDayForecast) {

                let date = document.createElement('DIV')
                date.classList.add("date")
                let dateDay = document.createElement('DIV')
                dateDay.classList.add("date-container")
                let dateDayHeader = document.createElement('H3')
                dateDayHeader.setAttribute("id", "day-" + i);
                let dateDayImg = document.createElement('IMG')
                dateDayImg.setAttribute("id", "weatherImg-" + i);

                let weather = document.createElement('DIV')
                weather.classList.add("weather")

                let weatherDes = document.createElement('H4')
                weatherDes.setAttribute("id", "weatherDes-" + i);

                let weatherTemp = document.createElement('H4')
                weatherTemp.setAttribute("id", "temp-" + i);

                date.appendChild(dateDay)
                dateDay.appendChild(dateDayImg)
                dateDay.appendChild(dateDayHeader)
                dateDay.appendChild(weather)
                weather.appendChild(weatherDes)
                weather.appendChild(weatherTemp)

                dateDayHeader.innerHTML = response.data.fiveDayForecast[i].day
                weatherDes.innerHTML = response.data.fiveDayForecast[i].des
                dateDayImg.src = getImage(response.data.fiveDayForecast[i].img_id)
                weatherTemp.innerHTML = Math.round(response.data.fiveDayForecast[i].temp) + '&#x2103;'

                container.appendChild(date)
                element.appendChild(container)
            }
        }
    })
}




const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {

        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        axios.post('/weather/geolocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            })
            .then((response) => {
                console.log(response.data)
                error.innerHTML = 'Loading'
                if (response.data.error) {
                    error.innerHTML = response.data.error
                } else {

                    document.getElementById("temperature").innerHTML = Math.round(response.data.temperature) + '&#x2103;'
                    //Location
                    document.getElementById("city").innerHTML = response.data.name + ", " + response.data.country;

                    //Weather temperature
                    document.getElementById("fellslike").innerHTML = "Feelslike " + Math.round(response.data.feelslike) + '&#x2103;'
                    document.getElementById("windspeed").innerHTML = "Wind Speed " + Math.round(response.data.wind) + " km/h"
                    document.getElementById("weatherDescription").innerHTML = response.data.weatherDescription
                    document.getElementById("pressure").innerHTML = "Prssure " + response.data.pressure + " mb"
                    document.getElementById("weatherImage").src = getImage(response.data.img);
                    document.getElementById("windDirection").innerHTML = "Wind Direcrtion " + response.data.windDir;
                    document.getElementById("humidity").innerHTML = "Humidity " + response.data.humidity + " %";
                    document.getElementById("temp_max").innerHTML = "H " + Math.round(response.data.temp_max) + '&#x2103; |';
                    document.getElementById("temp_min").innerHTML = " L " + Math.round(response.data.temp_min) + '&#x2103;';


                    //Air Pollution+ '&#x2103;'
                    // document.getElementById("pm25").innerHTML = "PM2.5 " + response.data.pm2_5
                    // document.getElementById("pm10").innerHTML = "PM10 " + response.data.pm10
                    // document.getElementById("no2").innerHTML = "NO2 " + response.data.no2
                    // document.getElementById("so2").innerHTML = "SO2 " + response.data.so2
                    // document.getElementById("co").innerHTML = "CO " + response.data.co
                    // document.getElementById("pollution").innerHTML = response.data.co

                    //Five day forecast
                    for (let i in response.data.fiveDayForecast) {

                        let dateDayHeader = document.getElementById('day-' + i)
                        let dateDayImg = document.getElementById('weatherImg-' + i)
                        let weatherDes = document.getElementById('weatherDes-' + i)
                        let weatherTemp = document.getElementById('temp-' + i)

                        dateDayHeader.innerHTML = response.data.fiveDayForecast[i].day
                        dateDayImg.src = getImage(response.data.fiveDayForecast[i].img_id)
                        weatherDes.innerHTML = response.data.fiveDayForecast[i].des
                        weatherTemp.innerHTML = Math.round(response.data.fiveDayForecast[i].temp) + '&#x2103;'
                    }
                }
            })
    })
}
weatherForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const location = address.value

    error.innerHTML = 'Loading'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                error.innerHTML = data.error
            } else {
                error.innerHTML = ''

                document.getElementById("temperature").innerHTML = Math.round(data.temperature) + '&#x2103;'
                //Location
                document.getElementById("city").innerHTML = data.name + ", " + data.country;

                //Weather temperature
                document.getElementById("fellslike").innerHTML = "Feelslike " + Math.round(data.feelslike) + '&#x2103;'
                document.getElementById("windspeed").innerHTML = "Wind Speed " + Math.round(data.wind) + " km/h"
                document.getElementById("weatherDescription").innerHTML = data.weatherDescription
                document.getElementById("pressure").innerHTML = "Prssure " + data.pressure + " mb"
                document.getElementById("weatherImage").src = getImage(data.img);
                document.getElementById("windDirection").innerHTML = "Wind Direcrtion " + data.windDir;
                document.getElementById("humidity").innerHTML = "Humidity " + data.humidity + " %";
                document.getElementById("temp_max").innerHTML = "H " + Math.round(data.temp_max) + '&#x2103; |';
                document.getElementById("temp_min").innerHTML = " L " + Math.round(data.temp_min) + '&#x2103;';


                //Air Pollution
                document.getElementById("pm25").innerHTML = "PM2.5 " + data.pm2_5
                document.getElementById("pm10").innerHTML = "PM10 " + data.pm10
                document.getElementById("no2").innerHTML = "NO2 " + data.no2
                document.getElementById("so2").innerHTML = "SO2 " + data.so2
                document.getElementById("co").innerHTML = "CO " + data.co
                document.getElementById("pollutanHeader").innerHTML = "Dominant air pollutants"
                document.getElementById("pollution").innerHTML = data.co


                //Five day forecast
                for (let i in data.fiveDayForecast) {

                    let dateDayHeader = document.getElementById('day-' + i)
                    let dateDayImg = document.getElementById('weatherImg-' + i)
                    let weatherDes = document.getElementById('weatherDes-' + i)
                    let weatherTemp = document.getElementById('temp-' + i)

                    dateDayHeader.innerHTML = data.fiveDayForecast[i].day
                    weatherDes.innerHTML = data.fiveDayForecast[i].des
                    weatherTemp.innerHTML = Math.round(data.fiveDayForecast[i].temp) + '&#x2103;'
                    dateDayImg.src = getImage(data.fiveDayForecast[i].img_id)
                }
            }
        })
    })
})