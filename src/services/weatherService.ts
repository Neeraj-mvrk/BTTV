import axios from 'axios';
import prisma from '../db/prisma';

export async function fetchWeatherData(lat: string | string[], lon: string | string[]): Promise<any> {
  try {
    const response = await axios.get(`${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

export async function fetchDailyWeatherData(): Promise<any> {
  try {
    const preferenceData = await prisma.preferences.findFirst({
      where: { userId: 1 },
    });
    if (preferenceData === null) {
      throw new Error('No preference data found for the user');
    }  
    const params = {
      "latitude": parseFloat(preferenceData.lat),
      "longitude":parseFloat(preferenceData.lon),
      "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_clear_sky_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max"],
      "forecast_days": 16
    };
    // const url = "https://api.open-meteo.com/v1/forecast";
    const response = await axios.get(`${process.env.OPENMEATEO_URL}`, {
      params:params
    })
    return response.data;
  } catch (error) {
    console.log(error,"ERROR")
    throw new Error('Error fetching weather data');
  }
}
