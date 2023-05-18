import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import dashboardRoutes from './handlers/dashboard';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

/* eslint-disable @typescript-eslint/no-var-requires */
const log = require('debug')('storefront:server');
const app: express.Application = express();

const PORT = process.env.SERVER_PORT || 3000;
const address = `0.0.0.0:${PORT}`;

app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  log('Received request for /');
  res.send('Welcome to the storefront API!');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);
dashboardRoutes(app);

app.listen(PORT, function () {
  log(`starting app on: ${address}`);
});

export default app;
