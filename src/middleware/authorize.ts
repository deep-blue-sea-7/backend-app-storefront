import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: () => void
): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};

export default verifyAuthToken;
