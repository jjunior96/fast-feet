import { Router } from 'express';

const routes = new Router();

// Funcionou
routes.get('/', (req, res) => {
  return res.json({ ok: true });
});

export default routes;
