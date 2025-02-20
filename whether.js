document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-button");
    const cityInput = document.getElementById("city-input");
    const weatherInfo = document.getElementById("weather-info");
    const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

    searchButton.addEventListener("click", function() {
        const cityName = cityInput.value;
        if (cityName) {
            fetchWeather(cityName);
        }
    });

    function fetchWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherInfo.innerHTML = `<p>City not found!</p>`;
                    weatherInfo.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }

    function displayWeather(data) {
        const { name, main, weather } = data;
        weatherInfo.innerHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Condition: ${weather[0].description}</p>
        `;
        weatherInfo.style.display = "block";
    }
});