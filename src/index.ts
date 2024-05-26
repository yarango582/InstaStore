import express, { Application } from 'express';
import dotenv from 'dotenv';
import storeRoutes from './routes/store.route';
import logRoutes from './routes/log.route';
import connectDB from './config/database.config';
import logger from './utils/logger/logger.util';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger.json';

dotenv.config();

const app: Application = express();

app.use(express.json());

connectDB();

app.use('/api/v1/stores', storeRoutes);
app.use('/api/v1/logs', logRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
