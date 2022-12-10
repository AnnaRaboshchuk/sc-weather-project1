//current date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
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
  "December"
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
let apiKey = "1ee4264117b73d2263eecd562f31ef5c";
let citySearch = document.querySelector("#c_input");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=metric`;

function showTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let tempHeader = document.querySelector("#temperature");
  tempHeader.innerHTML = temperature;
}
axios.get(apiUrl).then(showTemperature);
