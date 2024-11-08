import { useEffect, useState } from "react";
import "./App.css";
//import axios from 'axios';

function App() {
  const [WeatherData, setWeatherData] = useState(0);

  useEffect(() => {
    // Fetch the mock data from the public directory
    fetch("/WeatherMock.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch mock weather data");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => setWeatherData(data)) // Set the data into state
      .catch((error) => console.log(error)); // Handle any fetch errors
  }, []);

  return (
    <>
      <div>
        <h1> Weather App</h1>
      </div>
      <h2>Weather Data for {WeatherData ? WeatherData.name : "Loading..."}</h2>

      {WeatherData ? (
        <div>
          {/* Coordinates */}
          <p>
            Coordinates: {WeatherData.coord.lat}, {WeatherData.coord.lon}
          </p>

          {/* Weather Information */}
          <div>
            <h2>Weather</h2>
            <p>Main: {WeatherData.weather[0].main}</p>
            <p>Description: {WeatherData.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${WeatherData.weather[0].icon}.png`}
              alt={WeatherData.weather[0].description}
            />
          </div>

          {/* Main Info */}
          <div>
            <h2>Main Information</h2>
            <p>Temperature: {WeatherData.main.temp}°C</p>
            <p>Feels Like: {WeatherData.main.feels_like}°C</p>
            <p>Min Temp: {WeatherData.main.temp_min}°C</p>
            <p>Max Temp: {WeatherData.main.temp_max}°C</p>
            <p>Pressure: {WeatherData.main.pressure} hPa</p>
            <p>Humidity: {WeatherData.main.humidity}%</p>
          </div>

          {/* Wind Information */}
          <div>
            <h2>Wind</h2>
            <p>Speed: {WeatherData.wind.speed} m/s</p>
            <p>Direction: {WeatherData.wind.deg}°</p>
          </div>

          {/* Cloud Information */}
          <div>
            <h2>Cloud Coverage</h2>
            <p>Cloudiness: {WeatherData.clouds.all}%</p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
}

export default App;
