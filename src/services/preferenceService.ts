import prisma from '../db/prisma';
import { PreferenceData } from '../models/userModel';
import redis from '../utils/redisClient';


export const savePreference = async (data: PreferenceData): Promise<any> => {
  try {
    console.log(data,"DATA");
    const preference = await prisma.preferences.create({
      data: {
        location: data.location,
        minTemperature: data.minTemperature,
        maxTemperature: data.maxTemperature,
        humidity: data.humidity,
        condition: data.condition,
        notify: data.notify,
        userId: data.userId,
        lat: data.lat, // Save the userId to associate the preference with a user
        lon: data.lon,
      },
    });
    return preference;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating preference');
  }
};

export const getPreference = async (userId:number): Promise<any> => {
  try {
    const cacheKey = `preferences:${userId}`;
    // Check if cached result exists
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const preferences = await prisma.preferences.findMany({ where: { userId:userId}});
    await redis.setex(cacheKey, 86400, JSON.stringify(preferences));
    return preferences;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating preference');
  }
};

export const deletePreference = async (id: number): Promise<any> => {
  try {
    // Find preference to get userId
    const preference = await prisma.preferences.findUnique({ where: { id } });
    if (!preference) throw new Error("Preference not found");

    const userId = preference.userId;

    // Delete dependent forecast cache
    await prisma.forecastCache.deleteMany({
      where: { preferenceId: id }
    });

    // Delete preference
    const deleted = await prisma.preferences.delete({
      where: { id }
    });

    // Clear Redis cache
    const cacheKey = `preferences:${userId}`;
    await redis.del(cacheKey);

    return deleted;

  } catch (error) {
    console.error(error);
    throw new Error("Error deleting preference");
  }
};
  
