import { Request, Response } from 'express';
import { savePreference,getPreference } from '../services/preferenceService';
import { sendBadRequest,sendError,sendSuccess } from '../utils/response';

export const savePreferenceData = async (req: Request, res: Response): Promise<any> => {
  const { location, minTemperature, maxTemperature, humidity, condition, notify, userId, lat, lon } = req.body;

  // Validate required fields
  if (!location || !minTemperature || !maxTemperature || !condition || !userId) {
    return sendBadRequest(res,'Missing required fields.');
  }

  try {
    const preference = await savePreference({
      location,
      minTemperature,
      maxTemperature,
      humidity,
      condition,
      notify,
      userId,
      lat,
      lon, // Include userId to save preference for the correct user
    });
    return sendSuccess(res, preference);
  } catch (error) {
    console.error(error);
    return sendError(res, 'An error occurred while creating the preference.');
  }
};

export const getPreferenceData = async (req: Request, res: Response): Promise<any> => {
  try {
    const preference = await getPreference();
    return sendSuccess(res, "Fetched saved Reference",preference);
  } catch (error) {
    console.error(error);
    return sendError(res, 'An error occurred while creating the preference.');
  }
};
