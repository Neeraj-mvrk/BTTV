import express from 'express';
import { savePreferenceData,getPreferenceData, deletePreferenceData } from '../controllers/preferenceController';

const router = express.Router();

// Define the route and link to the controller
router.post('/', savePreferenceData);
router.get('/', getPreferenceData);
router.delete('/:id', deletePreferenceData);

export default router;