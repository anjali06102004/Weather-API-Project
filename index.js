
async function getWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = '';

    if (!location) {
        weatherInfo.innerHTML = '<p class="error">Please enter a location!</p>';
        return;
    }

    const apiKey = '1399007b6e92474f944180425252301';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        weatherInfo.innerHTML = `
            <h2>${data.location.name}, ${data.location.region}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="Weather Icon">
        `;
    } catch (error) {
        weatherInfo.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}
