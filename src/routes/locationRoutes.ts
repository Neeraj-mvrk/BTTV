import express from 'express';
import { getLocation } from '../controllers/locationController';

const router = express.Router();

// Define the route and link to the controller
router.get('/', getLocation);

export default router;
