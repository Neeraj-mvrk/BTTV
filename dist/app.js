"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const preferenceRoutes_1 = __importDefault(require("./routes/preferenceRoutes"));
const oauthRoutes_1 = __importDefault(require("./routes/oauthRoutes"));
const cookieParser = require('cookie-parser');
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    optionsSuccessStatus: 200,
};
app.use(cors());
app.use(express_1.default.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use('/api/users', userRoutes_1.default); // User routes
app.use('/api/mausam', weatherRoutes_1.default); // Register weather routes
app.use('/api/location', locationRoutes_1.default); // Register location routes
app.use('/api/preferences', authMiddleware_1.authMiddleware, preferenceRoutes_1.default);
app.use('/api/oauth', oauthRoutes_1.default); // Register location routes
app.get('/', (req, res) => {
    res.send('Welcome to your SaaS product!');
});
exports.default = app;
