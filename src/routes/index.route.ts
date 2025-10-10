import express from "express";
import userController from "../controllers/user.controller";
const indexRouter = express.Router();

indexRouter.get("/", userController.index_home);

indexRouter.get("/login", userController.user_login_get);

export default indexRouter;
