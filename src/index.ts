import express, { Application } from 'express';
import dotenv from 'dotenv';
import storeRoutes from './routes/store.route';
import connectDB from './config/database.config';
import logger from './utils/logger/logger.util';

dotenv.config();

const app: Application = express();

app.use(express.json());

connectDB();

app.use('/api/v1/stores', storeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});