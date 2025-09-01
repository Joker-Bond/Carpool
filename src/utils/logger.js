const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} [${level.toUpperCase()}] ${stack || message}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}] ${message}`;
        })
      )
    })
  ],
  exitOnError: false
});

logger.add(new transports.File({
  filename: path.join(logDir, 'error.log'),
  level: 'error'
}));

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.File({
    filename: path.join(logDir, 'combined.log')
  }));
}

module.exports = logger;