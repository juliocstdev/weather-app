const forms = document.querySelector("#search");
const alerta = document.querySelector("#alert");
const weather = document.querySelector("#weather");

forms.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cityName = document.querySelector("#cityName").value;

  if (!cityName || cityName.trim() === "") {
    weather.classList.remove("show");
    weather.classList.add("hide");
    return changeAlert("Digite uma localização válida!");
  }

  const apiKey = "fb229d0cf4586eb5ee721b487c4ce368";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  const result = await fetch(apiURL);
  const json = await result.json();

  if (json.cod == 200) {
    showElements({
      city: json.name,
      country: json.sys.country,
      description: json.weather[0].description,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      humidity: json.main.humidity,
      windy: json.wind.speed,
      icon: json.weather[0].icon,
    });
  } else {
    changeAlert("Localização não encontrada...");
    weather.classList.remove("show");
    weather.classList.add("hide");
  }
});

function showElements(json) {
  changeAlert("");

  weather.classList.remove("hide");
  weather.classList.add("show");

  document.querySelector("#title").innerHTML = json.city + ", " + json.country;
  document.querySelector("#tempDescription").innerHTML =
    json.description.charAt(0).toUpperCase() + json.description.slice(1);
  document.querySelector("#tempValue").innerHTML =
    json.temp.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";
  document.querySelector("#tempMax").innerHTML =
    json.tempMax.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";
  document.querySelector("#tempMin").innerHTML =
    json.tempMin.toFixed(1).toString().replace(".", ",") + "<sup>°C</sup>";
  document.querySelector("#humidity").innerHTML = json.humidity + "%";
  document.querySelector("#windy").innerHTML = json.windy.toFixed(1) + "km/h";
  document
    .querySelector("#tempImg")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/10d${json.icon}@2x.png`,
    );
}

function changeAlert(msg) {
  weather.classList.remove("show");
  weather.classList.add("hide");
  alerta.classList.add("show");
  alerta.innerHTML = msg;
}
