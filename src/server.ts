import app from './app';
import dotenv from 'dotenv';
import "./scheduler/cronJobs"

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
