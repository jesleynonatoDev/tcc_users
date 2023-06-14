import { Router } from 'express';
import { UserController } from './controllers/user';

const router: Router = Router();
const controller = new UserController();

router.get('/', (req, res) => {
  res.send('hello word');
});

router.get('/users', controller.list);
router.post('/users', controller.create)

export { router };
