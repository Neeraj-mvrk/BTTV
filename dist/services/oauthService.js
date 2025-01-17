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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogleCredential = verifyGoogleCredential;
exports.findOrCreateGoogleUser = findOrCreateGoogleUser;
exports.generateUserToken = generateUserToken;
// src/services/oauthService.ts
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
;
/**
 * For type safety, define an interface for environment variables or rely on process.env checks.
 * Make sure you have a fallback or error out if GOOGLE_CLIENT_ID / JWT_SECRET are missing.
 */
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
/**
 * Verifies the Google ID token and returns the payload (email, name, picture, etc.).
 */
function verifyGoogleCredential(credential) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error('Google token payload is empty');
        }
        return payload;
    });
}
/**
 * Creates or updates the user in the DB, then returns the user record.
 */
function findOrCreateGoogleUser(email, name, picture) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            user = yield prisma_1.default.user.create({
                data: {
                    email,
                    name,
                    image: picture,
                    provider: 'google',
                },
            });
        }
        else {
            // Optionally update user info
            // user = await prisma.user.update({ ... })
        }
        return user;
    });
}
/**
 * Generates a signed JWT for the user.
 */
function generateUserToken(userId, email) {
    const secret = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ userId, email }, secret, { expiresIn: '1h' });
}
