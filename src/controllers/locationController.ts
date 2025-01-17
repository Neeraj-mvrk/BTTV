import { Request, Response } from 'express';
import { fetchLocationData } from '../services/locationService';
import { sendBadRequest,sendSuccess,sendError } from '../utils/response';

export async function getLocation(req: Request, res: Response): Promise<void> {
  // Extract search keyword from request 
  const keyword = req.query.keyword as string;


  // Validate latitude and longitude parameters
  if (!keyword) {
    sendBadRequest(res,"Keyword required.")
    return;  // Exit the function after sending a response
  }

  try {
    // Call the service to fetch weather data
    const locationData = await fetchLocationData(keyword);
    sendSuccess(res, "Location data fetched successfully", locationData);  // Send success response with data
  } catch (error) {
    console.error(error);
    sendError(res, "Error fetching location data");  // Send error response
  }
}

