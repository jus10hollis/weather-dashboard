var apikey = "015bbcf25f5d5872e88411938188665c";
var city = document.querySelector(".searchInput").value;
var requestUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=` +
  city +
  `&unit=imperial&appid=${apikey}`;

var weather = {
  apikey: "015bbcf25f5d5872e88411938188665c",
  fetchWeather: function () {
    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
  showWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".placeName").innerText =
      "Current conditions in" + name;
    document.querySelector(".icon").src =
      `http://openweathermap.org/img/wn/` + icon + `@2x.png`;
    document.querySelector(".conditions").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelectory(".speed").innerText =
      "Wind speed: " + speed + "miles per hour";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".searchInput").value);
  },
};

document.querySelector(".searchBtn").addEventListener("click", function () {
  weather.search();
});

weather.fetchWeather(city);
