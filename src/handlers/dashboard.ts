import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const fiveMostPopular = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPopular();
    res.json(products);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostExpensive();
    res.json(products);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const usersWithOrders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOrders();
    res.json(users);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/five-most-popular', fiveMostPopular);
  app.get('/five-most-expensive', fiveMostExpensive);
  app.get('/products-in-orders', productsInOrders);
  app.get('/users-with-orders', usersWithOrders);
};

export default dashboardRoutes;
