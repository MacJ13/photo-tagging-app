import { HandlerType } from "../types/Handler";

const index_home: HandlerType = (req, res, next) => {
  res.redirect("/login");
};

const user_login_get: HandlerType = (req, res, next) => {
  res.render("pages/login", { title: "User Login" });
};

export default { index_home, user_login_get };
