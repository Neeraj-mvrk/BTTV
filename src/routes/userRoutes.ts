import { Router } from 'express';
import { getUsers, createUser,startCron } from '../controllers/userController';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.get('/cron', startCron);

export default router;
