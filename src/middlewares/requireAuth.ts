import { HandlerType } from "../types/Handler";

export const requireAuth: HandlerType = (req, res, next) => {
  if (!req.user) {
    return res.status(401).redirect("/login");
  }
  next();
};
