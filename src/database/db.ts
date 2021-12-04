import mongoose from 'mongoose';
import logger from '../config/winston';

const connectToDB = () => {
  if (!process.env.MONGODB_CONNECTION_STRING) {
    logger.error('connection string not defined');
    process.exit(1);
  }
  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  const db = mongoose.connection;
  db.on('connected', () => {
    logger.info(`DB connected, ${connectionString}`);
  });
  db.on('error', (error) => {
    logger.error(error.message);
    process.exit(1);
  });
  db.on('disconnected', () => {
    logger.info('mongodb connection lost');
  });

  return mongoose.connect(connectionString);
};

export default connectToDB;