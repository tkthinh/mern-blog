import { Response, Request, NextFunction } from "express";
import { ErrorWithCode } from "../lib/custom-error";

export function notFound(req: Request, res: Response, next: NextFunction) {
  return next(new ErrorWithCode(404, 'Page not found'));
}