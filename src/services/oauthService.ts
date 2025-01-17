// src/services/oauthService.ts
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';;

/**
 * For type safety, define an interface for environment variables or rely on process.env checks.
 * Make sure you have a fallback or error out if GOOGLE_CLIENT_ID / JWT_SECRET are missing.
 */
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Payload returned by Google after verifying the ID token.
 */
export interface GooglePayload {
  email?: string;
  name?: string;
  picture?: string;
  sub?: string;
  // Add other fields if needed
}

/**
 * Verifies the Google ID token and returns the payload (email, name, picture, etc.).
 */
export async function verifyGoogleCredential(credential: string): Promise<GooglePayload> {
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('Google token payload is empty');
  }
  return payload;
}

/**
 * Creates or updates the user in the DB, then returns the user record.
 */
export async function findOrCreateGoogleUser(email: string, name: string, picture?: string) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        image: picture,
        provider: 'google',
      },
    });
  } else {
    // Optionally update user info
    // user = await prisma.user.update({ ... })
  }
  return user;
}

/**
 * Generates a signed JWT for the user.
 */
export function generateUserToken(userId: number, email: string) {
  const secret = process.env.JWT_SECRET as string;
  return jwt.sign({ userId, email }, secret, { expiresIn: '1h' });
}
