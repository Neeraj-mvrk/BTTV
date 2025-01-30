import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authMiddleware = (req: Request, res: Response, next: NextFunction):void => {
  // Access token from the cookie
  const token =  req.headers['authorization'] || req.cookies.auth_token;
  console.log(token)

  if (!token) {
    res.status(403).json({ message: 'Access Denied: No token provided' });
    return; // Ensure the function returns `void`
  }

  try {
    // Verify token
    if(token==`Bearer ${process.env.TREKKINGTALE_SECRET}`){
      return next();
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded,"DECODE DATA");
    // req.email = decoded; // Attach decoded user info to the request object
    next(); // Proceed to the next middleware or route handler
  }  catch (error: any) {
    console.error('Token verification error:', error);
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expired. Please sign in again.' });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
    return; // Ensure the function returns `void`
  }
};
