let searchFormElement = document.getElementById("search-form");
let searchInputElement = document.getElementById("search-input");

let cityTextElement = document.getElementById("current-city");
let currentDateElement = document.getElementById("current-date");
let currentDescription = document.getElementById("current-description");
let currentTemperatureElement = document.getElementById("current-temperature");
let currentHumidityElement = document.getElementById("current-humidity");
let currentWindElement = document.getElementById("current-wind");
let currentIconElement = document.getElementById("current-temp-img");

let forecastElement = document.getElementById("forecast");

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${days[date.getDay()]} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function handleResponse(response) {
  let data = response.data;

  cityTextElement.innerHTML = data.city;
  currentDateElement.innerHTML = formatDate(new Date(data.time * 1000));
  currentDescription.innerHTML = `${data.condition.description}`;
  currentTemperatureElement.innerHTML = `${Math.round(data.temperature.current)}`;
  currentHumidityElement.innerHTML = `${data.temperature.humidity}`;
  currentWindElement.innerHTML = `${data.wind.speed}`;
  currentIconElement.innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}">`;
  getForecast(data.city);
}

function searchCity(city) {
  let apiKey = "d723abdbd1batbf0d4fo3fa95586fbba";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiURL).then(handleResponse);
}

function getForecast(city) {
  let apiKey = "d723abdbd1batbf0d4fo3fa95586fbba";
  let forecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(forecastURL).then(displayForecast);
}

function handleSubmitSearch(event) {
  event.preventDefault();
  let searchInput = searchInputElement.value;
  searchCity(searchInput);
  getForecast(searchInput);
  console.log("Performing search for:", searchInput);
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach((day, index) => {
    if (index < 5) {
      forecastHTML += `
                    <div class="forecast-day">
                    <div class="forecast-date">${formatDay(day.time)}</div>
                    <div> 
                    <img class="forecast-day-icon" src="${day.condition.icon_url}" alt="${day.condition.description}"></div>
                    <div class="forecast-temperatures">
                      <div class="forecast-temp max">${Math.round(day.temperature.maximum)}&deg;</div>
                      <div class="forecast-temp min">${Math.round(day.temperature.minimum)}&deg;</div>
                    </div>
                  </div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}

searchFormElement.addEventListener("submit", handleSubmitSearch);

searchCity("Chicago");
