import { NextFunction, Request, Response } from "express";

export type HandlerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
