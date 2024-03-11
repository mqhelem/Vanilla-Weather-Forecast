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
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Paris");
