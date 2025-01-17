// src/routes/oauthRoutes.ts
import { Router } from 'express';
import { googleOAuthHandler } from '../controllers/oauthController';

const router = Router();

// POST /api/oauth/google
router.post('/google', googleOAuthHandler);

export default router;
