import * as dotenv from 'dotenv';
dotenv.config();
import { Router } from 'express';
import productsRouter from 'modules/products/routes/products.routes';
import sessionsRouter from 'modules/users/routes/sessions.routes';
import usersRouter from 'modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;