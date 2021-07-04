//Set date
let currentDay = moment().format("Do MMMM YYYY")
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
var apiKey = 'f899a5fad6288f546bec1ed402c6fa37';


//weather data from current weather data api
let weather = {
    "apiKey": "f899a5fad6288f546bec1ed402c6fa37",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey

            // + city
            // + "&units=metric&appid="
            // + this.apiKey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
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


    },
};
// let uvInfo = {
// fetchUV: function () {
//     fetch (
//         "https://api.openweathermap.org/data/2.5/uvi?lat=" 
//         + data.coord.lat + "&lon=" 
//         + data.coord.lat + 
//         "&appid=" + 
//         apiKey

//         ).then((response) => response.json())
//         .then((data) => this.displayUV(data));
//     },
//     displayUV: function (data) {
//         const { uvi } = data.current;
//         console.log (uvi)
    





//search function
const searchCity = document.querySelector(".search-btn");
const cityInput = document.getElementById('city-input');
const currentWeatherContainer = document.querySelector(".current-box");

cityInput.addEventListener('change', function (event) {
    event.preventDefault();

    const userInput = event.target.value;


    searchCity.addEventListener('click', function (event) {
        event.preventDefault();
        currentWeatherContainer.classList.remove('hide');
        weather.fetchWeather(userInput)
    })
})


