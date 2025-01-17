"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'BTTV_1234';
const authMiddleware = (req, res, next) => {
    // Access token from the cookie
    const token = req.cookies.auth_token || req.headers['authorization'];
    console.log(token);
    if (!token) {
        res.status(403).json({ message: 'Access Denied: No token provided' });
        return; // Ensure the function returns `void`
    }
    try {
        // Verify token
        if (token == `Bearer ${process.env.TREKKINGTALE_SECRET}`) {
            return next();
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log(decoded, "DECODE DATA");
        // req.email = decoded; // Attach decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Token verification error:', error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired. Please sign in again.' });
        }
        else {
            res.status(401).json({ message: 'Invalid token' });
        }
        return; // Ensure the function returns `void`
    }
};
exports.authMiddleware = authMiddleware;
