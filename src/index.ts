import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import logger from './config/winston';
import connectToDB from './database/db';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

connectToDB();

const port = process.env.PORT || '8000';

app.listen(port, () => {
  logger.info(`Listen on port ${port}`);
});