"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthHandler = void 0;
const oauthService_1 = require("../services/oauthService");
const response_1 = require("../utils/response");
const googleOAuthHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { credential } = req.body;
        if (!credential) {
            return (0, response_1.sendBadRequest)(res, 'No credential provided');
        }
        // 1. Verify Google credential -> get payload
        const payload = yield (0, oauthService_1.verifyGoogleCredential)(credential);
        const { email, name, picture } = payload;
        // console.log(payload,"-----PAYLOAD")
        if (!email || !name) {
            return (0, response_1.sendBadRequest)(res, 'No email found in Google payload');
        }
        // 2. Create or update user
        const user = yield (0, oauthService_1.findOrCreateGoogleUser)(email, name, picture);
        // 3. Generate JWT
        const token = (0, oauthService_1.generateUserToken)(user.id, user.email);
        // Set HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        console.log(res.cookie, "COOKIE");
        // 4. Return token to the frontend
        return (0, response_1.sendSuccess)(res, 'Signed in successfully!');
    }
    catch (error) {
        console.error('Google OAuth error:', error);
        return (0, response_1.sendError)(res, 'Internal Server Error');
    }
});
exports.googleOAuthHandler = googleOAuthHandler;
