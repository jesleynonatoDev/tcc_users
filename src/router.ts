import { Router } from 'express';
import { UserController } from './controllers/user';

const router: Router = Router();
const controller = new UserController();

router.get('/', (req, res) => {
  res.send('hello word');
});

router.get('/users', controller.getAll);
router.get('/users/:id', controller.get);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete)

export { router };
