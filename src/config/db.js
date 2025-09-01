const mongoose = require('mongoose');
const logger = require('../utils/logger');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octodock';

const connectWithRetry = () => {
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('Database connection established'))
    .catch(err => {
      logger.error('Database connection failed, retrying in 5 seconds', err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  logger.info('Mongoose connection closed due to app termination');
  process.exit(0);
});

module.exports = mongoose;
