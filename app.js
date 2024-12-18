document.addEventListener("DOMContentLoaded", (e) => {

  console.log(`  __                       __                   __                              
 |  |--.-----.--.--.   .--|  .-----.--.--.-----|  .-----.-----.-----.----.-----.
 |     |  -__|  |  |   |  _  |  -__|  |  |  -__|  |  _  |  _  |  -__|   _|__ --|
 |__|__|_____|___  |   |_____|_____|\___/|_____|__|_____|   __|_____|__| |_____|
             |_____|                                    |__|                    
                                                                                
                                                                                
                                                                                `, `🤖`, 'font-size: 30px', 'error', 'color: red;');
  

  let apiBase =
    "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "3d8529e3eefd7e51ddc501ac46d394ab";

  let cityInput = document.querySelector(
    `input[type="text"]`
  );
  let searchButton = document.querySelector(
    ".search-button"
  );

  let emptyCity = document.querySelector(
    ".empty-city-name"
  );
  let wrongCity = document.querySelector( ".wrong-city-name");
  searchButton.addEventListener("click", fetchInput);
  cityInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      fetchInput();
    }
  });

  function fetchInput() {
    let city;
    city = cityInput.value;
    if (cityInput.value === "") {
      console.error("input city name");
      emptyCity.style.display = "block";
      wrongCity.style.display = "none";

      return;
    }

    let apiLink = `${apiBase}?q=${city}&appid=${apiKey}`;
    let cityName = document.querySelector(".city");
    let temperature = document.querySelector(".temp");
    let wind = document.querySelector(".wind");
    let humidity = document.querySelector(".humidity");
    let weatherIcon =
      document.querySelector(".weather-icon");

    fetch(apiLink)
      .then((response) => {
        if (!response.ok) {
          if (response.status == 404) {
            document.querySelector(
              ".weather"
            ).style.display = "none";
            wrongCity.style.display = "block";
            emptyCity.style.display = "none";
          }
          throw new Error(
            `HTTP error! Status: ${response.status}`
          );
        }

        return response.json();
      })
      .then((data) => {
        wrongCity.style.display = "none";
        emptyCity.style.display = "none";
        cityName.textContent = cityInput.value;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed}km/h`;
        temperature.textContent = `${Math.floor(
          data.main.temp - 273.15
        )}°C`;

        switch (data.weather[0].main.toLowerCase()) {
          case "clear":
            weatherIcon.src = "images/clear.png";

            break;
          case "clouds":
            weatherIcon.src = "images/clouds.png";

            break;

          case "drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
          case "mist":
            weatherIcon.src = "images/mist.png";
            break;
          case "rain":
            weatherIcon.src = "images/rain.png";
            break;
          case "snow":
            weatherIcon.src = "images/snow.png";
            break;

          default:
            break;
        }
        document.querySelector(".weather").style.display =
          "block";
      })
      .catch((error) => {
        console.error(
          "Error fetching data:",
          error.message
        );
      });
  }
});
