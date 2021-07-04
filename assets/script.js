

//variable time
//variable current date
//variable city
//search button
//sunny icon
//cloudy icon
//thunder icon
//rain icon


//weather items
//temp
//wind
//humidit
//uv

//User enters city in search bar
const cityInput = document.getElementById('city-input');

cityInput.addEventListener('change', function (event) {
    event.preventDefault();

    const userInput = event.target.value;

    console.log(userInput);


    getWeatherData(userInput)
        .then(res => {
            console.log(res)
        })


});

//variable api key
var apiKey = 'f899a5fad6288f546bec1ed402c6fa37';

//This gets data from One Call API which has UV info

function getOneCallData(lon, lat) {




    return fetch(`${resolveProtocol()}//api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response) => response.json())


}

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

//function to call API and get UV data
function getWeatherData(city) {


    return fetch(resolveProtocol() + '//api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
        .then((response) => response.json())
        .then(function (response) {
            return getOneCallData(response.coord.lon, response.coord.lat)
        })
}
getWeatherData("perth")
    .then(response => {
        console.log(response);
    })
    ;


    


//one call API and current weather data API

//search click function

// function to change UV index colour 
    //depending on high (red) or low (green)

//function to search for city
    //user enters city name


    //user gets the current day weather for the city
            //date displayed with city name
            //temp/wind/humidity/UV index data displayed
            //user also gets 5-day forecast for the city

//function to save search history
    //user search history of cities saved in local storage
        //searched cities persist even when user refreshes browser

