import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorWithCode } from "./custom-error";
import type { UserPayload, AuthenticatedRequest } from '../lib/authenticated-request'

export function verifyToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies.access_token;
  if (!token) {
    return next(new ErrorWithCode(401, 'Unauthorized!'));
  }
  
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;

    (req as AuthenticatedRequest).user = user;
  } catch (error) {
    return next(new ErrorWithCode(401, 'Unauthorized!'));
  }
  next();
}