
console.log('Hello, its weather time!')


const searchForm = document.getElementById('city-search');
const weatherInput = document.getElementById('city-input');
const cityNameDisplay = document.getElementById('city');
const highDetails = document.getElementById('high');
const lowDetails = document.getElementById('low');
const forecastDetails = document.getElementById('forecast');
const humidDetails = document.getElementById('humidity');

const displayError = (message) => {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error-message');
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
};
const kelvinToFahrenheit = (kelvin) => {
    return (kelvin - 273.15) * 9/5 + 32;
};
const fetchWeather = async (cityName) => {
    try {
        const apiKey = '084f3e0bb363631425193cce198d873a';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError("Location doesn't exist, or is misspelled. Please try a different one.");
    }
};
const displayWeather = (data) => {
    const { name } = data;
    const { temp_max, temp_min, humidity } = data.main;
    const { main } = data.weather[0];
    
    const tempMaxFahrenheit = kelvinToFahrenheit(temp_max);
    const tempMinFahrenheit = kelvinToFahrenheit(temp_min);

    cityNameDisplay.textContent =`The weather in ${name}`;
    highDetails.textContent = `The High today is ${tempMaxFahrenheit.toFixed(2)}\u00B0F`;
    lowDetails.textContent = `The Low today is ${tempMinFahrenheit.toFixed(2)}\u00B0F`;
    forecastDetails.textContent = `Today's Forecast is lookin a little ${main}`;
    humidDetails.textContent = `Today's Humidity is ${humidity}%`;

    setBackGroundImage(main); 
};
const setBackGroundImage = (weather) => {
    console.log('Weather:', weather);
    let imageUrl; 
    switch(weather.toLowerCase()) {
        case 'clear':                  //works
            imageUrl = '/images/clear.gif';
            break;
        case 'rain':
            imageUrl = '/images/rainy.gif'; //works
            break;
        case 'clouds':
            imageUrl = '/images/cloudy.gif'; // works
            break;
        case 'snowy':
            imageUrl = '/images/snowy.gif'; // i seriously cant find a city that its snowing in
            break;
        case 'thunderstorm':
            imageUrl = '/images/thunderstorm.gif'
            break;
        default:
            imageUrl = '/images/sunny.jpg';  //default image isnt loading upon entering the page.
            break;
    }
    console.log('Image URL:', imageUrl);
    document.body.style.backgroundImage = `url(${imageUrl})`;
};
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityName = weatherInput.value.trim().toLowerCase();
    if (cityName) {
        fetchWeather(cityName);
    } else {
        displayError('Please enter a city.');
    }
});