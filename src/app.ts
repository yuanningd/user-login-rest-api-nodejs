import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', routes);

export default app;