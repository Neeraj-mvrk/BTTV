import express, { Request, Response } from 'express';
const cors = require('cors');
import userRoutes from './routes/userRoutes';
import weatherRoutes from './routes/weatherRoutes';
import locationRoutes from './routes/locationRoutes';
import preferencesRoutes from './routes/preferenceRoutes';
import oauthRoutes from './routes/oauthRoutes';
const cookieParser = require('cookie-parser');
import { authMiddleware } from './middleware/authMiddleware';

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use('/api/users', userRoutes);  // User routes
app.use('/api/mausam', weatherRoutes);  // Register weather routes
app.use('/api/location', locationRoutes);  // Register location routes
app.use('/api/preferences', authMiddleware, preferencesRoutes); 
app.use('/api/oauth', oauthRoutes); // Register location routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to your SaaS product!');
});

export default app;
