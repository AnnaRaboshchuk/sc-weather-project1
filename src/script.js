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


//real temperature

function showTemperature(response) {
  console.log(response.data);
  let tempHeader = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let mainIcon = document.querySelector("#icon");
  tempHeader.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  mainIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  mainIcon.setAttribute("alt", response.data.condition.description);
}



