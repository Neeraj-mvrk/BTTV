import express from 'express';
import { getWeather,getDailyWeather } from '../controllers/weatherController';

const router = express.Router();

// Define the route and link to the controller
router.get('/', getWeather);
router.get('/daily', getDailyWeather);

export default router;
