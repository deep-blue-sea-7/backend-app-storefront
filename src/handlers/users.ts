import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/authorize';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const newUser = await store.create(user);
    res.json(newUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      id: req.body.id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const updatedUser = await store.update(user);

    res.json(updatedUser);
  } catch (err) {
    res.status(400);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(req.body.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
  };

  try {
    const u = await store.authenticate(
      user.firstname,
      user.lastname,
      user.password
    );

    if (u == null) {
      res.status(401);
      res.json('The user information was incorrect.');
    } else {
      const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);
      res.json(token);
    }
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.put('/users', verifyAuthToken, update);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/login', authenticate);
};

export default userRoutes;
