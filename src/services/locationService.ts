import axios from 'axios';

export async function fetchLocationData(keyword: string ): Promise<any> {
  try {
    // console.log(`${process.env.LOCATION_API}?key=${process.env.FORWARD_GEOCODING}&q=${keyword}&format=json`)
    const response = await axios.get(`${process.env.LOCATION_API}?key=${process.env.FORWARD_GEOCODING}&q=${keyword}&format=json`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching location data');
  }
}
