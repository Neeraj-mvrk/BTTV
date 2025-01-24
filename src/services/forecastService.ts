// forecastService.ts (example in TypeScript w/ Prisma, adapt to your ORM)

import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { getBestTravelDays,buildDailyWeatherArray } from '../utils/weatherHelper'; // your logic that interprets & filters

const prisma = new PrismaClient();

const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

/**
 * Step 1: Fetch from Open-Meteo and store in forecast_cache
 */
async function fetchAndCacheForecast(preferenceId: number) {
  const preference = await prisma.preferences.findUnique({
    where: { id: preferenceId },
  });
  if (!preference) {
    throw new Error("Preference not found");
  }

  // Build request params for Open-Meteo
  /* const params = {
    latitude: preference.lat,
    longitude: preference.lon,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      // ...
    ],
    forecast_days: 16,
    timezone: "Asia/Kolkata", // or any other valid timezone
  }; */
  const params = {
    "latitude": parseFloat(preference.lat),
    "longitude":parseFloat(preference.lon),
    "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min", "sunrise", "sunset", "windspeed_10m_max"],
    "forecast_days": 16
  };

  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params,
  });

  const forecastData = response.data;

  // Save or update forecastData in forecast_cache
  await prisma.forecastCache.upsert({
    where: { preferenceId },
    update: {
      forecastData: forecastData,
      updatedAt: new Date(),
    },
    create: {
      preferenceId,
      forecastData,
      updatedAt: new Date(),
    },
  });

  return forecastData;
}

/**
 * Step 2: Compute best days for that preference
 */
async function computeAndCacheBestDays(preferenceId: number, forecastData: any) {
  // 1. Get user preference from DB (it has condition, minTemp, maxTemp, etc.)
  const preference = await prisma.preferences.findUnique({
    where: { id: preferenceId },
  });
  if (!preference) {
    throw new Error("Preference not found");
  }

  // 2. Use your getBestTravelDays logic
  const bestDays = getBestTravelDays(forecastData.daily,preference);

  // 3. Store bestDays in forecast_cache (in bestDaysData column)
  await prisma.forecastCache.update({
    where: { preferenceId },
    data: {
      bestDaysData: bestDays,
    },
  });

  return bestDays;
}

/**
 * Step 3: Main function to get best days from cache (if fresh) or re-fetch & compute
 */
export async function getBestDaysForPreference(preferenceId: number) {
  // 1. Check if we have forecast cache
  const cached = await prisma.forecastCache.findUnique({
    where: { preferenceId },
  });

  const now = Date.now();

  if (cached) {
    const updatedAtMs = new Date(cached.updatedAt).getTime();
    const isFresh = now - updatedAtMs < CACHE_DURATION_MS;

    if (isFresh && cached.bestDaysData) {
      // If cached data is fresh & we already have bestDaysData, just return it
      return cached.bestDaysData;
    }

    // Otherwise, re-fetch forecast, re-compute best days
    const newForecastData = await fetchAndCacheForecast(preferenceId);
    const newBestDays = await computeAndCacheBestDays(preferenceId, newForecastData);
    return newBestDays;
  } else {
    // No cache at all, do everything fresh
    const newForecastData = await fetchAndCacheForecast(preferenceId);
    const newBestDays = await computeAndCacheBestDays(preferenceId, newForecastData);
    return newBestDays;
  }
}

export async function fetchAllTravelDays(preferenceId: number){
    const cached = await prisma.forecastCache.findUnique({
        where: { preferenceId },
      });

      if (cached) {
        const dailyData:any = cached.forecastData;
        const allDaysData = await buildDailyWeatherArray(dailyData.daily);
        return allDaysData;
      }
    
}
