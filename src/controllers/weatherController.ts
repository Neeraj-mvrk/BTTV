import { Request, Response } from 'express';
import { fetchWeatherData,fetchDailyWeatherData } from '../services/weatherService';
import {sendSuccess,sendError,sendBadRequest} from '../utils/response';

export async function getWeather(req: Request, res: Response): Promise<void> {
  // Extract lat and lon from query and cast to string
  const lat = req.query.lat as string;
  const lon = req.query.lon as string;

  // Validate latitude and longitude parameters
  if (!lat || !lon) {
    sendBadRequest(res,"Latitude and Longitude are required.")
    return;  // Exit the function after sending a response
  }

  try {
    // Call the service to fetch weather data
    const weatherData = await fetchWeatherData(lat, lon);
    sendSuccess(res,"Weather data fetched successfully", weatherData);  // Send a success response with weather data
  } catch (error) {
    console.error(error);
    sendError(res,"Error fetching weather data")
  }
}

export async function getDailyWeather(req: Request, res: Response): Promise<void> {
  try {
    // Call the service to fetch weather data
    const {preferenceId} = req.query; 
    const numPrefId = Number(preferenceId);
    if(isNaN(numPrefId)){
        sendBadRequest(res,"Invalid preferenceId")
        return;  // Exit the function after sending a response
    }
    //  console.log(req.query,"QUERY");
    const weatherData = await fetchDailyWeatherData(numPrefId);
    sendSuccess(res,"Weather data fetched successfully", weatherData);  // Send a success response with weather data
  } catch (error) {
    console.error(error);
    sendError(res,"Error fetching weather data")
  }
}

