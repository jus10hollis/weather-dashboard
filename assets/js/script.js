var apikey = "015bbcf25f5d5872e88411938188665c";
var cityForm = document.querySelector(".searchInput");
var cities = JSON.parse(localStorage.getItem("cities"));
/// From a brief instructor-led tutorial on jquery UI and sortable list for stored cities
$("ul").sortable();
if (!cities) {
  cities = [];
} else {
  for (var i = 0; i < cities.length; i++) {
    var li = document.createElement("li");
    li.textContent = cities[i];
    li.classList = "ui-state-default";
    document.querySelector("ul").appendChild(li);
  }
  cities.unshift(searchInput);
  console.log(JSON.stringify(["cityname", "city", "othercity"]));
  localStorage.setItem("city", JSON.stringify(searchInput));
}

///Structure below I learned from a combination of studying 'Build a Weather App with HTML, CSS & JavaScript by Jonah Lawrence (https://youtu.be/WZNG8UomjSI).
var weather = {
  apikey: "015bbcf25f5d5872e88411938188665c",
  fetchWeather: function () {
    var requestUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=` +
      cityForm.value +
      `&unit=imperial&appid=${apikey}`; /// I learned this way of concatenating from my tutor: Jude Clark
    fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.showWeather(data);
        this.getForecast(data.coord);
      });
  },
  // I learned this structure studying Jonah Lawrence's youtube tutorial (https://youtu.be/WZNG8UomjSI)
  showWeather: function (data) {
    const { name } = data;
    const { lat } = data.coord;
    const { lon } = data.coord;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, lat, lon, icon, description, temp, humidity, speed);
    document.querySelector(".placeName").innerText =
      "Current conditions in " + name;
    document.querySelector(".icon").src =
      `http://openweathermap.org/img/wn/` + icon + `@2x.png`;
    document.querySelector(".conditions").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".speed").innerText =
      "Wind speed: " + speed + " miles per hour";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".searchInput").value);
  },
  /// Extended application of what I learned from the structure above.
  getForecast: function (coords) {
    const { lat } = coords;
    const { lon } = coords;
    var apiKey = "015bbcf25f5d5872e88411938188665c";
    var fcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

    fetch(fcastUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var fiveDay = document.querySelector(".fiveDayEl");
        fiveDay.appendChild(); // Still need HTML elements to display five forecast cards with weather info.
      });
  },
};

document
  .querySelector(".searchBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    weather.search();
  });
