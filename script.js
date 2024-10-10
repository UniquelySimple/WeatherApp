// Note : This script file is not entirely independent
// The 'weather' object contains my openweather key 'me' a.k.a Rahul Pramanik
// fetch recieves the weather classified with specified city and my key !Required
// for more information visit https://openweathermap.org/guide
// -----------------------------------------------------------
// xxxxx IF YOU ARE NOT RAHUL THEN STAY AWAY FROM MY KEY xxxxx
// -----------------------------------------------------------
let weather = {
    apiKey: "c788884293d7dce84cb4ee5d971632de",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name, timezone } = data;
      const { icon, description } = data.weather[0];
      const { speed, deg } = data.wind;
      const { lon, lat } = data.coord;
      const { country } = data.sys;
      const { feels_like,temp_min,temp_max,temp, humidity } = data.main;
      document.querySelector(".timezone").innerText = "Timezone : " + timezone;
      document.querySelector(".deg").innerText = "Wind Direction : " + deg;
      document.querySelector(".lon").innerText = "Longitude : " + lon;
      document.querySelector(".lat").innerText = "Latitude : " + lat;
      document.querySelector(".country").innerText = "Country : " + country;
      document.querySelector(".feels_like").innerText = "Feels like : " + feels_like;
      document.querySelector(".temp_min").innerText = "Min Temperature : " + temp_min;
      document.querySelector(".temp_max").innerText = "Max Temperature : " + temp_max;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        document.querySelector(".card1").classList.remove("loading");
        document.querySelector(".card2").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Kolkata");
  