import { useState, useEffect } from 'react';

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export default function useWeather(location) {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!location) return;
        
        const controller = new AbortController();

        const fetchCoordinates = async (location) => {
            const response = await fetch(`${GEOCODING_URL}?name=${location}`, { signal: controller.signal });

            if (!response.ok) {
                throw new Error('Failed to fetch coordinates');
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error(`City "${location}" not found`);
            }

            const { latitude, longitude, name, country } = data.results[0];
            return { latitude, longitude, name, country };
        };

        const fetchWeather = async (latitude, longitude) => { 
            const weatherResponse = await fetch(
                `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
                { signal: controller.signal }
            );
            const humidityResponse = await fetch(
                `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m`,
                { signal: controller.signal }
            );

            if (!weatherResponse.ok || !humidityResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const weatherJson = await weatherResponse.json();
            const humidityJson = await humidityResponse.json();

            return {
                temperature: weatherJson.current_weather?.temperature,
                windspeed: weatherJson.current_weather?.windspeed,
                winddirection: weatherJson.current_weather?.winddirection,
                isDay: weatherJson.current_weather?.is_day,
                weathercode: weatherJson.current_weather?.weathercode,
                humidity: humidityJson.current?.relative_humidity_2m,
            };
        };

        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            setWeatherData(null);

            try {
                const { latitude, longitude, name, country } = await fetchCoordinates(location);
                const weather = await fetchWeather(latitude, longitude);
                setWeatherData({ ...weather, city: name, country });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchWeatherData();

        return () => {
            controller.abort();
        };
    }, [location]);

    return { weatherData, loading, error };
}