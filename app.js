// Weather Widget App - Built with Bitvagrant AI
class WeatherWidget {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadWeather();
    }

    async loadWeather() {
        try {
            // Try to get weather for Munich (since that's where the OpenAI job is!)
            const response = await fetch('https://wttr.in/Munich?format=j1');
            const data = await response.json();
            
            this.displayWeather(data);
        } catch (error) {
            console.log('Real API failed, using mock data');
            this.displayMockWeather();
        }
    }

    displayWeather(data) {
        const current = data.current_condition[0];
        const location = data.nearest_area[0];
        
        document.getElementById('city').textContent = location.areaName[0].value;
        document.getElementById('temp').textContent = `${current.temp_C}°`;
        document.getElementById('description').textContent = current.weatherDesc[0].value;
        document.getElementById('humidity').textContent = `${current.humidity}%`;
        document.getElementById('wind').textContent = `${current.windspeedKmph} km/h`;
        document.getElementById('feels').textContent = `${current.FeelsLikeC}°`;
    }

    displayMockWeather() {
        // Mock weather data for demo
        const mockData = {
            city: 'Munich',
            temp: 8,
            description: 'Light Snow',
            humidity: 78,
            wind: 12,
            feels: 4
        };

        document.getElementById('city').textContent = mockData.city;
        document.getElementById('temp').textContent = `${mockData.temp}°`;
        document.getElementById('description').textContent = mockData.description;
        document.getElementById('humidity').textContent = `${mockData.humidity}%`;
        document.getElementById('wind').textContent = `${mockData.wind} km/h`;
        document.getElementById('feels').textContent = `${mockData.feels}°`;
    }
}

function refreshWeather() {
    const widget = new WeatherWidget();
    // Add a little loading state
    document.getElementById('city').textContent = 'Loading...';
    document.getElementById('temp').textContent = '--°';
    document.getElementById('description').textContent = 'Getting weather data...';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new WeatherWidget();
});

// Fun easter egg - double click for random city
document.addEventListener('dblclick', () => {
    const cities = ['Berlin', 'Paris', 'Tokyo', 'Sydney', 'New York', 'London', 'Munich', 'Dublin'];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    document.getElementById('city').textContent = randomCity;
    
    // Simulate random weather with more realistic ranges
    const temp = Math.floor(Math.random() * 35 - 10); // -10 to 25°C
    const humidity = Math.floor(Math.random() * 40 + 40); // 40-80%
    const wind = Math.floor(Math.random() * 25 + 5); // 5-30 km/h
    
    document.getElementById('temp').textContent = `${temp}°`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('wind').textContent = `${wind} km/h`;
    document.getElementById('feels').textContent = `${temp - 2}°`;
    document.getElementById('description').textContent = 'Simulated Weather';
});