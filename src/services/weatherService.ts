import axios from 'axios';
import  redis  from '../utils/redisClient';
import { getBestDaysForPreference,fetchAllTravelDays } from './forecastService';

export async function fetchWeatherData(lat: string | string[], lon: string | string[]): Promise<any> {
  try {
    const cacheKey = `weather:${lat}-${lon}`;
    // Check if cached result exists
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await axios.get(`${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`);
    await redis.setex(cacheKey, 86400, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error('Error fetching weather data');
  }
}

export async function fetchDailyWeatherData(preferenceId:number): Promise<any> {
  try { 
    const btdCacheKey = `btd:${preferenceId}`;
    const atdCacheKey = `atd:${preferenceId}`;

    // Fetch both cached values in parallel
    const [btdCache, atdCache] = await Promise.all([
      redis.get(btdCacheKey),
      redis.get(atdCacheKey)
    ]);

    // If both cached results exist, return parsed data
    if (btdCache && atdCache) {
      return {
        bestDays: JSON.parse(btdCache),
        travelDays: JSON.parse(atdCache),
      };
    }
    const bestDays = await getBestDaysForPreference(preferenceId);
    const travelDays = await fetchAllTravelDays(preferenceId);
    await redis.setex(btdCacheKey, 86400, JSON.stringify(bestDays));
    await redis.setex(atdCacheKey, 86400, JSON.stringify(travelDays));
    return {travelDays,bestDays};
  } catch (error) {
    console.log(error,"ERROR")
    throw new Error('Error fetching weather data');
  }
}
