import express, { Request, Response } from 'express';
import verifyAuthToken from '../middleware/authorize';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(Number(req.params.id));
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const showForUser = async (req: Request, res: Response) => {
  try {
    const order = await store.showForUser(Number(req.params.user_id));
    res.json(order);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.body.id,
      status: req.body.status,
      user_id: req.body.user_id,
    };

    const updated = await store.update(order);

    res.json(updated);
  } catch (err) {
    res.status(400);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id;
    const productId = req.body.product_id;
    const quantity = parseInt(req.body.quantity);

    const addedProduct = await store.addProduct(quantity, orderId, productId);

    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await store.delete(req.body.id);

    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.get('/orders/:user_id/users', verifyAuthToken, showForUser);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders', verifyAuthToken, update);
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  app.delete('/orders/:id', verifyAuthToken, destroy);
};

export default orderRoutes;
