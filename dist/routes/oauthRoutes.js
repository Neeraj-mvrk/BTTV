"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/oauthRoutes.ts
const express_1 = require("express");
const oauthController_1 = require("../controllers/oauthController");
const router = (0, express_1.Router)();
// POST /api/oauth/google
router.post('/google', oauthController_1.googleOAuthHandler);
exports.default = router;
