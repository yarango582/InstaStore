import express, { Application } from 'express';
import dotenv from 'dotenv';
import storeRoutes from './routes/store.route';
import logRoutes from './routes/log.route';
import connectDB from './config/database.config';
import logger from './utils/logger/logger.util';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Application = express();

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter);

connectDB();

app.use('/api/v1/stores', storeRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
