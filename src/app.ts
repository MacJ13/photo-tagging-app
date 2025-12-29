import express, { Response } from "express";
import DBService from "./service/db.service";
import dotenv from "dotenv";
import { PATH_ENV } from "./config/env.config";
import indexRouter from "./routes/index.route";
import path from "path";

import session from "express-session";
import { MONGO_STORE } from "./config/db.config";
import passport from "./config/passport.config";
import imageRouter from "./routes/image.route";
import helmet from "helmet";
import crypto from "crypto";
import { generateCspNonce } from "./middlewares/generateCspNonce";


dotenv.config(PATH_ENV);

const app = express();
const PORT = process.env.PORT || 5000;


// 1. middleware to generate nonce for each request
app.use(generateCspNonce);


app.use(helmet({
  contentSecurityPolicy: {
  directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'", 
          (req, res) => `'nonce-${(res as Response).locals.cspNonce}'`
        ], 
        "img-src": ["'self'", "data:", "*"],     
      },
  }
}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: true,
    store: MONGO_STORE,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Set to true if using HTTPS
  })
);

app.use(passport.session());

app.use("/", indexRouter);
app.use("/images", imageRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, Typescript with Express");
// });

app.listen(PORT, async () => {
  await DBService.getInstance().connect();
  console.log(`Server is running on port: ${PORT}`);
});
