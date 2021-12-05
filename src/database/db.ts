import mongoose from 'mongoose';
import logger from '../config/winston';

const connectToDB = () => {
  const connectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://root:root_password@localhost:27017/app?authSource=admin';
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