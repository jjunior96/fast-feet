import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.post('/files', upload.single('file', FileController.store));

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);

// Rotas privadas
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);

export default routes;
