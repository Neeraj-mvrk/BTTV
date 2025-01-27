import axios from 'axios';
import prisma from '../db/prisma';
import { getBestDaysForPreference,fetchAllTravelDays } from './forecastService';
import { sendEmail } from '../utils/sendEmail';

export async function fetchWeatherData(lat: string | string[], lon: string | string[]): Promise<any> {
  try {
    const response = await axios.get(`${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

export async function fetchDailyWeatherData(preferenceId:number): Promise<any> {
  try { 
    const bestDays = await getBestDaysForPreference(preferenceId);
    const travelDays = await fetchAllTravelDays(preferenceId);
    return {travelDays,bestDays};
  } catch (error) {
    console.log(error,"ERROR")
    throw new Error('Error fetching weather data');
  }
}
