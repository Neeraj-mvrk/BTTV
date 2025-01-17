import prisma from '../db/prisma';
import { PreferenceData } from '../models/userModel';


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

export const getPreference = async (): Promise<any> => {
  try {
    const preference = await prisma.preferences.findMany({ where: { userId: 1 }});
    return preference;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating preference');
  }
};
