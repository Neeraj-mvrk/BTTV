import express from 'express';
import { savePreferenceData,getPreferenceData } from '../controllers/preferenceController';

const router = express.Router();

// Define the route and link to the controller
router.post('/', savePreferenceData);
router.get('/', getPreferenceData);
export default router;