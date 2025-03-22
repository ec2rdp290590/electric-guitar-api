/**
 * Custom error handling middleware
 * Centralizes error handling logic for the application
 */

import logger from '../utils/logger.js';

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('An error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Determine status code (default to 500)
  const statusCode = err.statusCode || 500;
  
  // Create error response
  const errorResponse = {
    message: err.message || 'Internal Server Error',
    status: statusCode
  };
  
  // Add stack trace in development
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
  }
  
  // Send error response
  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
