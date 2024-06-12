import { Router } from 'express';
import { getAllLogsController } from '../controllers/log.controller';

const router: Router = Router();

router.get('/', getAllLogsController);

export default router;