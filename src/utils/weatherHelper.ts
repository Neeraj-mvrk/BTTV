import { Preferences } from "@prisma/client";

// utils/weatherHelpers.ts

// Define an interface for the Open-Meteo daily data structure you receive.
export interface OpenMeteoDailyData {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    // Optional if needed:
    windspeed_10m_max?: number[];
    sunrise?: string[];
    sunset?: string[];
    // etc. Add any other properties you use from the daily object.
  }
  
  export type Condition = "Sunny" | "Cloudy" | "Rainy" | "Windy" | "Snowy" | "Other";
  
  
  /**
   * Map the given weather code (and optional wind speed) to a condition label.
   * Modify thresholds/logic as needed.
   */
  export function interpretCondition(
    code: number,
    maxWindSpeed: number = 0
  ): Condition {
    // If you want to classify "Windy" by wind speed > 25 (km/h) or so:
    if (maxWindSpeed > 25) {
      return "Windy";
    }
  
    // Snow codes (example from Open-Meteo docs)
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
      return "Snowy";
    }
  
    // Rain codes
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
      return "Rainy";
    }
  
    // Cloudy codes
    if ([2, 3].includes(code)) {
      return "Cloudy";
    }
  
    // Sunny codes (0, 1)
    if ([0, 1].includes(code)) {
      return "Sunny";
    }
  
    // Fallback if none matched
    return "Other";
  }
  
  /**
   * Returns an array of days that match the user's preferred condition + temperature range.
   * Modify or extend as needed (e.g. partial matches, scoring system, etc.).
   */
  export function getBestTravelDays(
    dailyData: OpenMeteoDailyData,
    userPrefs: Preferences
  ) {
    const { time, weather_code, temperature_2m_min, temperature_2m_max, windspeed_10m_max } = dailyData;
    const bestDays: Array<{
      date: string;
      condition: Condition;
      minTemp: number;
      maxTemp: number;
      sunrise?: string;
      sunset?: string;
    }> = [];
  
    // Check length consistency
    const daysCount = time.length;
    console.log(userPrefs,"userPrefs");
  
    for (let i = 0; i < daysCount; i++) {
      const code = weather_code[i];
      const dayCondition = interpretCondition(
        code,
        windspeed_10m_max ? windspeed_10m_max[i] : 0
      );
  
      if (dayCondition === userPrefs.condition) {
       
        const dayMinTemp = temperature_2m_min[i];
        const dayMaxTemp = temperature_2m_max[i];
        bestDays.push({
          date: time[i],
          condition: dayCondition,
          minTemp: dayMinTemp,
          maxTemp: dayMaxTemp,
          sunrise: dailyData.sunrise?.[i],
          sunset: dailyData.sunset?.[i],
        });
  
        // Compare temperature range
        if (
          dayMinTemp >= userPrefs.minTemperature &&
          dayMaxTemp <= userPrefs.maxTemperature
        ) {
          bestDays.push({
            date: time[i],
            condition: dayCondition,
            minTemp: dayMinTemp,
            maxTemp: dayMaxTemp,
            sunrise: dailyData.sunrise?.[i],
            sunset: dailyData.sunset?.[i],
          });
        }
      }
    }
  
    return bestDays;
  }
  
  export interface DayWeather {
    date: string;
    condition: Condition;
    minTemp: number;
    maxTemp: number;
    sunrise?: string;
    sunset?: string;
  }
  
  /**
   * Builds an array of DayWeather objects from Open-Meteo's daily forecast data.
   */
  export function buildDailyWeatherArray(daily:OpenMeteoDailyData): DayWeather[] {
    const results: DayWeather[] = [];
  
    // Ensure we have the necessary arrays
    const length = daily.time.length; // base off time array
    for (let i = 0; i < length; i++) {
      const code = daily.weather_code[i];
      const dayCondition = interpretCondition(code);
  
      const dayMinTemp = daily.temperature_2m_min[i];
      const dayMaxTemp = daily.temperature_2m_max[i];
  
      results.push({
        date: daily.time[i],
        condition: dayCondition,
        minTemp: dayMinTemp,
        maxTemp: dayMaxTemp,
        sunrise: daily.sunrise?.[i], // may be undefined if not in the response
        sunset: daily.sunset?.[i],
      });
    }
  
    return results;
  }