import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file', FileController.store));

routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipients', RecipientController.index);

// Rotas privadas
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

export default routes;
