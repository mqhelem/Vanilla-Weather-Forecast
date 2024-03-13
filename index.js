function searchCity(city) {
  let apiKey = "50863a45edtc0d26o66bb25fa39f84fc";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric
`;
  axios.get(url).then(weatherData);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  searchCity(city.value);
}

function weatherData(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  let weatherCondition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherIcon = document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);
  temperature.innerHTML = Math.round(response.data.temperature.current);
  weatherCondition.innerHTML = response.data.condition.description;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  weatherIcon.src = `${response.data.condition.icon_url}`;
  let time = document.querySelector("#time");
  time.innerHTML = changeDate(date);
  getForecast(response.data.city);
}
function changeDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// forecast
function getForecast(city) {
  let apiKey = "50863a45edtc0d26o66bb25fa39f84fc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios(apiUrl).then(displayForecast);
}
function forecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForecast(response) {
  console.log(response.data);
  let weatherForecast = document.querySelector("#forecast");

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      
  <div class="row">
    <div class="c0l-2">
      <div class="forecast-day">${forecastDay(day.time)}</div>
      <img
        src="${day.condition.icon_url}"
        alt=""
      />
      <div class="weather-temperature">
        <span class="max-temperature">${Math.round(
          day.temperature.maximum
        )}°</span>
        <span class="min-temperature">${Math.round(
          day.temperature.minimum
        )}</span>
      </div>
    </div>
  </div>
`;
    }
  });
  weatherForecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Bulawayo");
