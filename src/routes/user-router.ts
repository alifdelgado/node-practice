import { Router } from 'express';
import * as usersController from '../controllers/users-controller';

const router: Router = Router();

router.get('', usersController.getUsers);
router.post('/create', usersController.createUser);
router.post('/login', usersController.login);
router.get('/:userId', usersController.getUserById);
router.delete('/:userId', usersController.deleteById);

export default router;