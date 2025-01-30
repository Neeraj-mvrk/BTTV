import axios from 'axios';
import redis from '../utils/redisClient';

export async function fetchLocationData(keyword: string ): Promise<any> {
  try {
    // console.log(`${process.env.LOCATION_API}?key=${process.env.FORWARD_GEOCODING}&q=${keyword}&format=json`)
    const cacheKey = `location:${keyword}`;
    // Check if cached result exists
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const response = await axios.get(`${process.env.LOCATION_API}?key=${process.env.FORWARD_GEOCODING}&q=${keyword}&format=json`);
    await redis.setex(cacheKey, 31536000, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw new Error('Error fetching location data');
  }
}
