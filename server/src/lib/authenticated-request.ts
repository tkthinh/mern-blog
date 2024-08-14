import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
  photoUrl: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}