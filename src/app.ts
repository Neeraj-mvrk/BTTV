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

app.use(cors());
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser()); // Parse cookies
app.use('/api/users', authMiddleware,userRoutes);  // User routes
app.use('/api/mausam', weatherRoutes);  // Register weather routes
app.use('/api/location', locationRoutes);  // Register location routes
app.use('/api/preferences', authMiddleware, preferencesRoutes); 
app.use('/api/oauth', oauthRoutes); // Register location routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to your SaaS product!');
});

export default app;
