import { HandlerType } from "../types/Handler";
import crypto from "crypto";

// 1. middleware to generate nonce for each request
export const generateCspNonce: HandlerType = (req, res, next) => {
  // generate random string 16 bytes in base64
  res.locals.cspNonce = crypto.randomBytes(16).toString("base64");
  next();
}