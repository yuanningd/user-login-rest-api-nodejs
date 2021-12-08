import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '../config/winston';

let mongod: MongoMemoryServer;

export const connectToTestDB = async () => {
  mongod = await MongoMemoryServer.create();

  const uri = mongod.getUri();
  try {
    await mongoose.connect(uri, {});
  } catch (error) {
    logger.error(error);
  }
};

export const disconnectToTestDB = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};
