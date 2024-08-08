import { Request, Response, NextFunction } from "express";
import { ErrorWithCode } from "../lib/custom-error";

export function handleError(
  err: ErrorWithCode,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const message = JSON.parse(err.message);
    res.status(err.statusCode).json({ message });
  } catch (error) {
    res.status(err.statusCode).json({ message: err.message });
  }
}