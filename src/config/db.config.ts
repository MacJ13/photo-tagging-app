import dotenv from "dotenv";
import { PATH_ENV } from "./env.config";
import MongoStore from "connect-mongo";

dotenv.config(PATH_ENV);
// Validate and export MongoDB connection configuration.
// This file expects the following env vars to be set (see .env.example):
// DB_USER, DB_PASSWORD, DB_NAME

export const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@myatlasclusteredu.5v0vras.mongodb.net/${process.env.DB_NAME_TEST}?retryWrites=true&w=majority`;

export const MONGO_STORE = MongoStore.create({
  mongoUrl: MONGO_URI,
  collectionName: "sessions",
  ttl: 60 * 60 * 24, // 1 day
});
