/**
 * Simple logger utility for the Electric Guitar API
 * Provides consistent logging format across the application
 */

// Log levels
const LOG_LEVELS = {
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG'
};

/**
 * Format the current date and time for logging
 * @returns {string} Formatted date and time
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Log a message with the specified level
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} data - Additional data to log (optional)
 */
const log = (level, message, data = null) => {
  const logEntry = {
    timestamp: getTimestamp(),
    level,
    message
  };

  if (data) {
    logEntry.data = data;
  }

  console.log(JSON.stringify(logEntry));
};

// Export log functions for each level
export default {
  info: (message, data) => log(LOG_LEVELS.INFO, message, data),
  warning: (message, data) => log(LOG_LEVELS.WARNING, message, data),
  error: (message, data) => log(LOG_LEVELS.ERROR, message, data),
  debug: (message, data) => {
    // Only log debug messages in development environment
    if (process.env.NODE_ENV !== 'production') {
      log(LOG_LEVELS.DEBUG, message, data);
    }
  }
};
