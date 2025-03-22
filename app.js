// Import required modules
import express from 'express';
import cors from 'cors';
import guitarRoutes from './routes/guitars.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';
import logger from './utils/logger.js';

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(requestLogger);

// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Electric Guitar API',
    version: '1.0.0',
    endpoints: {
      guitars: '/api/guitars'
    }
  });
});

// Use guitar routes
app.use('/api/guitars', guitarRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
