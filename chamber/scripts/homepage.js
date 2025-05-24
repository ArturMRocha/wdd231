// homepage.js

// DOM Elements
const currentYearElement = document.getElementById('current-year');
const weatherIconElement = document.getElementById('weather-icon');
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const forecastElement = document.getElementById('forecast');
const memberSpotlightsElement = document.getElementById('member-spotlights');

// Constants
const WEATHER_API_KEY = '709df0eae13d55e26053e1e651e8fcd8'; 
const HOLAMBRA_LAT =-22.62;
const HOLAMBRA_LON =-47.05 ;
const WEATHER_UNITS = 'imperial'; 

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
    displayMemberSpotlights();
});

// Weather Functions
async function fetchWeatherData() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${HOLAMBRA_LAT}&lon=${HOLAMBRA_LON}&units=${WEATHER_UNITS}&appid=${WEATHER_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        
        const data = await response.json();
        updateWeatherDisplay(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayWeatherError();
    }
}

function updateWeatherDisplay(data) {
    // Current weather
    const current = data.list[0];
    const currentTemp = Math.round(current.main.temp);
    const currentDesc = current.weather[0].description;
    const currentIcon = current.weather[0].icon;
    
    currentTempElement.textContent = `${currentTemp}°${WEATHER_UNITS === 'metric' ? 'C' : 'F'}`;
    weatherDescElement.textContent = currentDesc;
    weatherIconElement.innerHTML = getWeatherIcon(currentIcon);
    
    // 3-day forecast
    forecastElement.innerHTML = '';
    
    // Group forecasts by day
    const dailyForecasts = {};
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temps: [],
                icons: []
            };
        }
        
        // Only consider forecasts between 12pm and 3pm for daily representation
        const hour = date.getHours();
        if (hour >= 12 && hour <= 15) {
            dailyForecasts[day].temps.push(Math.round(forecast.main.temp));
            dailyForecasts[day].icons.push(forecast.weather[0].icon);
        }
    });
    
    // Display forecast for next 3 days
    const days = Object.keys(dailyForecasts).slice(0, 3);
    days.forEach(day => {
        const dayData = dailyForecasts[day];
        const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length);
        const mostCommonIcon = getMostCommonIcon(dayData.icons);
        
        const forecastDayElement = document.createElement('div');
        forecastDayElement.className = 'forecast-day';
        forecastDayElement.innerHTML = `
            <div class="forecast-day-name">${day}</div>
            <div class="forecast-icon">${getWeatherIcon(mostCommonIcon)}</div>
            <div class="forecast-temp">${avgTemp}°${WEATHER_UNITS === 'metric' ? 'C' : 'F'}</div>
        `;
        
        forecastElement.appendChild(forecastDayElement);
    });
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '☀️', // clear sky day
        '01n': '🌙', // clear sky night
        '02d': '⛅', // few clouds day
        '02n': '⛅', // few clouds night
        '03d': '☁️', // scattered clouds
        '03n': '☁️', // scattered clouds
        '04d': '☁️', // broken clouds
        '04n': '☁️', // broken clouds
        '09d': '🌧️', // shower rain
        '09n': '🌧️', // shower rain
        '10d': '🌦️', // rain day
        '10n': '🌦️', // rain night
        '11d': '⚡', // thunderstorm
        '11n': '⚡', // thunderstorm
        '13d': '❄️', // snow
        '13n': '❄️', // snow
        '50d': '🌫️', // mist
        '50n': '🌫️'  // mist
    };
    
    return iconMap[iconCode] || '🌡️'; // default icon
}

function getMostCommonIcon(icons) {
    const count = {};
    icons.forEach(icon => {
        count[icon] = (count[icon] || 0) + 1;
    });
    
    return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
}

function displayWeatherError() {
    weatherIconElement.textContent = '⚠️';
    currentTempElement.textContent = '--°';
    weatherDescElement.textContent = 'Weather data unavailable';
    forecastElement.innerHTML = '<p>Forecast not available</p>';
}

// Member Spotlight Functions
function displayMemberSpotlights() {
    // Filter gold and silver members
    const eligibleMembers = members.filter(member => 
        member.membership === 'gold' || member.membership === 'silver'
    );
    
    // Randomly select 2-3 members
    const numToShow = Math.min(Math.max(2, Math.floor(Math.random() * 3) + 1), eligibleMembers.length);
    const selectedMembers = [];
    
    while (selectedMembers.length < numToShow && eligibleMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
        selectedMembers.push(eligibleMembers[randomIndex]);
        eligibleMembers.splice(randomIndex, 1);
    }
    
    // Display the selected members
    memberSpotlightsElement.innerHTML = '';
    selectedMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.innerHTML = `
            <img src="${member.logo}" alt="${member.name} logo" width="100">
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">Visit Site</a></p>
            <p class="membership-badge ${member.membership}">${member.membership.charAt(0).toUpperCase() + member.membership.slice(1)} Member</p>
        `;
        memberSpotlightsElement.appendChild(memberCard);
    });
}

// Member data (would normally be fetched from JSON file)
const members = [
    {
        "name": "Flores Holambra",
        "description": "Maior produtor de flores da região",
        "address": "Rua das Tulipas, 100",
        "phone": "(19) 3802-1000",
        "website": "https://floresholambra.com.br",
        "logo": "images/Flowerslogo.jpg",
        "membership": "gold"
    },
    {
        "name": "Café Holandês",
        "description": "Cafeteria tradicional com doces caseiros",
        "address": "Avenida dos Moinhos, 250",
        "phone": "(19) 3802-2000",
        "website": "https://cafeholandes.com.br",
        "logo": "images/cafeholandes.png",
        "membership": "silver"
    },
    {
        "name": "Queijaria De Vol",
        "description": "Produtos lácteos artesanais",
        "address": "Estrada dos Laticínios, 75",
        "phone": "(19) 3802-3000",
        "website": "https://queijariadevol.com.br",
        "logo": "images/queijariadevol.jpg",
        "membership": "gold"
    }
];