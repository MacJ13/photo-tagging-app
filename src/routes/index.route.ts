import express from "express";
import userController from "../controllers/user.controller";
import { loginValidator } from "../middlewares/loginValidators";
import { handleValidationErrors } from "../middlewares/handleValidation";
import passport from "passport";

const indexRouter = express.Router();

indexRouter.get("/", userController.index_home);

indexRouter.get("/login", userController.user_login_get);

indexRouter.post(
  "/login",
  loginValidator,
  handleValidationErrors,
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  })
);

indexRouter.post("/logout", userController.user_logout_post);

export default indexRouter;
