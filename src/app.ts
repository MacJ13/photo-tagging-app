import express, { Request, Response } from "express";
import DBService from "./service/db.service";
import dotenv from "dotenv";
import { PATH_ENV } from "./config/env.config";
import indexRouter from "./routes/index.route";
import path from "path";
dotenv.config(PATH_ENV);

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, Typescript with Express");
// });

app.listen(PORT, async () => {
  await DBService.getInstance().connect();
  console.log(`Server is running on port: ${PORT}`);
});
