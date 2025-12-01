import express from "express";
import userController from "../controllers/user.controller";
import { loginValidator } from "../middlewares/bodyValidators";
import { handleValidationErrors } from "../middlewares/handleValidation";

const indexRouter = express.Router();

indexRouter.get("/", userController.index_home);

indexRouter.get("/login", userController.user_login_get);

indexRouter.post(
  "/login",
  loginValidator,
  handleValidationErrors,
  userController.user_login_post
);

indexRouter.post("/logout", userController.user_logout_post);

indexRouter.get("/dashboard", userController.user_dashboard_get);

export default indexRouter;
