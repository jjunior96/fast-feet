import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipients', RecipientController.index);

routes.post('/recipients', RecipientController.store);

export default routes;
