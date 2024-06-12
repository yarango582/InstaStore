import { Router } from 'express';
import { getClosestStoreController, getAllStoresController } from '../controllers/store.controller';

const router: Router = Router();

router.get('/closest', getClosestStoreController);
router.get('/', getAllStoresController)

export default router;
