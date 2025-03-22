/**
 * Request logging middleware
 * Logs information about incoming requests
 */

import logger from '../utils/logger.js';

/**
 * Log details about incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requestLogger = (req, res, next) => {
  // Get request start time
  const startTime = Date.now();
  
  // Log request details
  logger.info('Request received', {
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip
  });
  
  // Log response details when request completes
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    
    logger.info('Request completed', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
};

export default requestLogger;
