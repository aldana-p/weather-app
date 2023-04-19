/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};


let city = prompt("Enter a city");

if (city !== "") {
  city = city.toLowerCase();

  if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let humidity = weather[city].humidity;
    let celsius = Math.round(temperature);
    let fahrenheit = Math.round((temperature * 9) / 5 + 32);

    alert(
      `It is currently ${celsius}°C (${fahrenheit}°F) in ${city} with a humidity of ${humidity}%`
    );
  } else {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city.toLowerCase()}`
    );
  }
} else {
  alert("Please enter a city");
}

*/

function formatDate(timestamp) {
  console.log(timestamp);
  let now = new Date(timestamp);
  console.log(now);
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[now.getDay()];
  let hours = now.getHours();
  let min = now.getMinutes();
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (min < 10) {
    min = "0" + min;
  }

  let date = document.getElementById("date");
  date.innerHTML = "Last updated: " + day + " " + hours + ":" + min;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = document.querySelector("#todays-temperature");
  let temperature = temp.innerHTML;
  let celsiusTemp = ((temperature - 32) * 5) / 9;
  temp.innerHTML = Math.round(celsiusTemp);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temp = document.querySelector("#todays-temperature");
  let temperature = temp.innerHTML;
  let fahrenheitTemp = (temperature * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}

function showTemperature(response) {
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temp = Math.round(response.data.main.temp);
  let hum = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let des = response.data.weather[0].description;
  let iconId = response.data.weather[0].icon;

  let temperature = document.querySelector("#todays-temperature");
  temperature.innerHTML = temp;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = hum;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = wind;
  let description = document.querySelector("#description");
  description.innerHTML = des;

  //Fecha
  formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconId}@2x.png`
  );
  icon.setAttribute("alt", des);
}

// WITH A CITY INPUT
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let citySpan = document.querySelector("#city");
  if (cityInput.value !== "") {
    citySpan.innerHTML = cityInput.value;
    let apiKey = "caa883a4a60d93878755b08a933f74ea";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    alert("Please enter a city");
  }
}

function showCurrentCity(response) {
  let citySpan = document.querySelector("#city");
  //console.log(response.data.name);
  citySpan.innerHTML = response.data.name;
}

//CURRENT LOCATION BTN
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "caa883a4a60d93878755b08a933f74ea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentCity);
  axios.get(apiUrl).then(showTemperature);
}

//Paso de unidades
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

//Búsqueda de ciudad y actualización de temperatura
let btnSearch = document.querySelector("#search");
btnSearch.addEventListener("click", searchCity);

// Current city
navigator.geolocation.getCurrentPosition(showPosition);

let btnCurrentCity = document.querySelector("#current-city");
btnCurrentCity.addEventListener("click", showPosition);
