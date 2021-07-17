//Set date
let currentDay = moment().format("Do MMMM YYYY");

const fiveDayForecastColumns = document.getElementById('five-day-forecast-column');

// const searchHistory = document.querySelector('.searchHistory');
/**
 * This function will resolve the correct connection protocol for the api call
 * @returns string
 */
function resolveProtocol() {


    let protocol;

    // protocol can be http / https or file
    // check if 
    if (window.location.protocol.slice(0, 4) === 'http') {
        protocol = window.location.protocol;
    } else {
        protocol = 'http:';
    }

    return protocol
}
//variable api key
const apiKey = 'f899a5fad6288f546bec1ed402c6fa37';


//weather data from current weather data api
let weather = {
    fetchOnecall: function (lon, lat) {
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then((res) => res.json());

    },

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + apiKey


        ).then((response) => response.json())
            .then((data) => {
                return this.fetchOnecall(data.coord.lon, data.coord.lat)
                    .then((onecallData) => {
                        return {
                            data: data,
                            uvIndex: onecallData.current.uvi,
                            onecallData: onecallData,
                        }
                    })
            })
            // payload is referring to the last object return by the promise chain
            .then((payload) => {
                this.displayWeather(payload.data, payload.uvIndex);
                this.displayForecasts(payload.onecallData.daily.slice(0, 5));

            });

    },
    displayWeather: function (data, uvIndex) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { lon, lat } = data.coord;
        console.log(name, icon, temp, humidity, speed, lon, lat)

        document.querySelector("#city").innerText = name + ", " + currentDay;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".currentTemp").innerText = "Temp: " + temp + "°c";
        document.querySelector(".currentWind").innerText = "Wind: " + speed + " KM/H";
        document.querySelector(".currentHumidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".currentUV").innerText = "UV Index: " + uvIndex;


    },


    displayForecasts(forecasts) {
        function generateIconUrl(iconCode) {

            return "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        }



        for (let index = 0; index < forecasts.length; index++) {
            const forecast = forecasts[index];

            const card = document.createElement('div');
            card.setAttribute('class', "column is-2-right");

            const forecastBox = document.createElement('div');
            forecastBox.setAttribute("class", "box forecast-box");

            const HumandateDisplay = ((forecast.dt) * 1000);
            const DateDisplayed = new Date(HumandateDisplay);


            const date = document.createElement("div");
            date.setAttribute("class", "Date");
            date.textContent = "Date: " + moment(DateDisplayed).format("DD-MM-YYYY");
            forecastBox.appendChild(date)

            const icon = document.createElement("img");
            icon.setAttribute("src", generateIconUrl(forecast.weather[0].icon));
            icon.setAttribute("class", "icon");
            forecastBox.appendChild(icon);

            const forecastTemp = document.createElement("p");
            const fiveDayTemp = ((forecast.temp.day) - 273.15);
            const RoundedTemp = (Math.round(fiveDayTemp));
            forecastTemp.setAttribute("class", "Temp");
            forecastTemp.textContent = "Temp: " + RoundedTemp + "°c";
            forecastBox.appendChild(forecastTemp);

            const forecastWind = document.createElement("p");
            forecastWind.setAttribute("class", "Wind");
            forecastWind.textContent = "Wind: " + (forecast.wind_speed) + " KM/H";
            forecastBox.appendChild(forecastWind);

            const forecastHumidity = document.createElement("p");
            forecastHumidity.setAttribute("class", "Humidity");
            forecastHumidity.textContent = "Humidity: " + (forecast.humidity) + "%";
            forecastBox.appendChild(forecastHumidity);

            card.appendChild(forecastBox);

            fiveDayForecastColumns.appendChild(card);


        }
    }

};





//search function
const searchCity = document.querySelector(".search-btn");
const cityInput = document.getElementById('city-input');
const SearchList = document.querySelector(".searchHistory");
const currentWeatherContainer = document.querySelector(".current-box");
const searchContainer = document.querySelector(".searchHistoryContainer");

cityInput.addEventListener('change', function (event) {
    event.preventDefault();

    const userInput = event.target.value;


    searchCity.addEventListener('click', function (event) {
        event.preventDefault();
        currentWeatherContainer.classList.remove('hide');
        weather.fetchWeather(userInput)
        console.log(userInput);



    });
    //save user city search inputs in local storage

    const CityEntry = {
        'cityInput': cityInput.value,

    }
    let CitiesSearched = [];

    const newCitiesSearched = JSON.parse(localStorage.getItem('newCities'))
    if (newCitiesSearched) {
        CitiesSearched = CitiesSearched.concat(newCitiesSearched);
        searchContainer.classList.remove('hide');
    }

    CitiesSearched.push(CityEntry);
    localStorage.setItem('newCities', JSON.stringify(CitiesSearched));

    //Display searched cities
})

   




