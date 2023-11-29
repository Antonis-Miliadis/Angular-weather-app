import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


  const apiKey: string = '11f2d0fc13895fc541618288a0a1127f';

const cityInput: HTMLInputElement | null = document.getElementById('cityInput') as HTMLInputElement;
const searchButton: HTMLElement | null = document.getElementById('searchButton');
const weatherInfo: HTMLElement | null = document.querySelector('.weather');

if (searchButton && cityInput && weatherInfo) {
    searchButton.addEventListener('click', () => {
        const city: string = cityInput.value;
        getWeatherData(city);
    });
}

function getWeatherData(city: string): void {
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then((data: any) => {
            const cityName: string = data.name;
            const country: string = data.sys.country;
            const temperature: number = data.main.temp;
            const description: string = data.weather[0].description;
            const minTemperature: number = data.main.temp_min;
            const maxTemperature: number = data.main.temp_max;
            const humidity: number = data.main.humidity;
            const windSpeed: number = data.wind.speed;

            const weatherHTML: string = `
                <h2>${cityName}, ${country}</h2>
                <p>Θερμοκρασία: ${temperature}°C</p>
                <p>Περιγραφή: ${description}</p>
                <p>Ελάχιστη Θερμοκρασία: ${minTemperature}°C</p>
                <p>Μέγιστη Θερμοκρασία: ${maxTemperature}°C</p>
                <p>Υγρασία: ${humidity}%</p>
                <p>Ταχύτητα Ανέμου: ${windSpeed} m/s</p>
            `;

            if (weatherInfo) {
                weatherInfo.innerHTML = weatherHTML;
            }
        })
        .catch(error => {
            console.error('Σφάλμα κατά την ανάκτηση των δεδομένων του καιρού:', error);
        });
}
