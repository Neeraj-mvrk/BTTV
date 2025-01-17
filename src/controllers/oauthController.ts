// src/controllers/oauthController.ts
import { Request, Response } from 'express';
import {
  verifyGoogleCredential,
  findOrCreateGoogleUser,
  generateUserToken,
} from '../services/oauthService';
import { sendBadRequest,sendSuccess,sendError } from '../utils/response';


export const googleOAuthHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { credential } = req.body as { credential?: string };
    if (!credential) {
      return sendBadRequest(res,'No credential provided')
    }

    // 1. Verify Google credential -> get payload
    const payload = await verifyGoogleCredential(credential);
    const { email, name, picture } = payload;
    // console.log(payload,"-----PAYLOAD")
    if (!email || !name) {
      return sendBadRequest(res,'No email found in Google payload');
    }

    // 2. Create or update user
    const user = await findOrCreateGoogleUser(email, name, picture);

    // 3. Generate JWT
     const token = generateUserToken(user.id, user.email);

     // Set HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'?true:false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    console.log(res.cookie,"COOKIE");

    // 4. Return token to the frontend
    return sendSuccess(res, 'Signed in successfully!');
  } catch (error) {
    console.error('Google OAuth error:', error);
    return sendError(res, 'Internal Server Error');
  }
}
