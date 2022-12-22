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
current.innerHTML = `${day}, ${date} ${months[month]} ${year} , ${hours}:${minuts}`;

//city search
function enterCity(event) {
  event.preventDefault();
  let showCity = document.querySelector("#city");
  let citySearch = document.querySelector("#c_input");
  showCity.innerHTML = citySearch.value;
}
let cityInput = document.querySelector("#form_search");
cityInput.addEventListener("submit", enterCity);

//real temperature

function showTemperature(response) {
  console.log(response.data);
  let tempHeader = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  tempHeader.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "fa83f6abf9f3cb059b4c510t1c4bof9a";
let citySearch = document.querySelector("#c_input");
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
