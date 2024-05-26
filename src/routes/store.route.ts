import { Router } from 'express';
import { getClosestStore } from '../controllers/store.controller';

const router: Router = Router();

router.get('/closest', getClosestStore);

export default router;
