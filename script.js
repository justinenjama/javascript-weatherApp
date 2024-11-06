document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value.trim();

    document.getElementById('loading').style.display = 'none';

    if (city === "") {
        document.getElementById('weatherData').innerHTML = `<h1 style="color: red; font-weight: bold">You have not entered anything. 🫵😂😁</h1>`;
        document.getElementById('weatherData').style.display = 'block';
    } else {
        fetchWeatherData(city);
    }
});  

function fetchWeatherData(city) {
    const apiKey = 'a6c0e2adf3d190c8df009a03616f0a21'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loading').style.display = 'block';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                //throw new Error('City not found');
                throw new Error(`${document.getElementById('cityInput').value} not found. 🙆<br> Try a different city. 🙆‍♀️`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('weatherData').innerHTML = `<h1 style="color: red; font-weight: bold">${error.message}</h1>`;
            document.getElementById('weatherData').style.display = 'block';
        });
}
function displayWeatherData(data) {
    const weatherHtml = `
        <h2>${data.name}</h2>
        <h3>Country Code: ${data.sys.country}</h3>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="Weather Icon" /> <br>
        Temperature: ${data.main.temp} °C <br>
        Humidity: ${data.main.humidity} % <br>
        Wind-Speed: ${data.wind.speed} m/s <br>
        Description: ${data.weather[0].description} <br> `;

    document.getElementById('weatherData').innerHTML = weatherHtml;
    document.getElementById('weatherData').style.display = 'block';

    document.getElementById('loading').style.display = 'none';
}