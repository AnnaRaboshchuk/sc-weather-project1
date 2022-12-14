//current date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = now.getMonth();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minuts = now.getMinutes();
if (minuts < 10) {
  minuts = `0${minuts}`;
}

let current = document.querySelector("h3.date");
current.innerHTML = `Last updated: ${day}, ${date} ${months[month]} ${year} , ${hours}:${minuts}`;

//forecast date format
function formatDay(timestamp) {
  let date = new Date (timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];

}

//forecast
function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-i");

  let forecastHTML = `<div class="row">`;
  

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col day">
       <div class="forecast-date">${formatDay(forecastDay.time)}</div>
       <div class="forecast-temperature">
        <span class="forecast-temp-max">${Math.round(
          forecastDay.temperature.maximum
        )}°C /</span>
        <span class="forecast-temp-min">${Math.round(
          forecastDay.temperature.minimum
        )}°C</span>
       </div>
      <br />
      <img
        src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        alt=""
        id="icons"
        width="10" 
      />
     </div>
  `;
    }  
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//forecast real temperature
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "fa83f6abf9f3cb059b4c510t1c4bof9a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

//city search
function search(city) {
  let apiKey = "fa83f6abf9f3cb059b4c510t1c4bof9a";
  let citySearch = document.querySelector("#c_input");
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#c_input");
  search(citySearch.value);
  console.log(citySearch.value);
  let showCity = document.querySelector("#city");

  showCity.innerHTML = citySearch.value;
}
let cityInput = document.querySelector("#form_search");
cityInput.addEventListener("submit", enterCity);

function showTemperature(response) {
  console.log(response.data);
  let tempHeader = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let mainIcon = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;

  tempHeader.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  mainIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  mainIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}



search("London");
