//utils/geocode.js
import axios from 'axios';

const API_KEY = process.env.OPENCAGE_API_KEY; // Замените на ваш API ключ

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
      params: {
        key: API_KEY,
        q: address,
        limit: 1
      }
    });

    if (response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry;
      console.log(`Geocoded ${address}: ${lat}, ${lng}`);
      return { lat, lng };
    }
    console.log(`No results for ${address}`);
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};