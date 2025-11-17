import { HandlerType } from "../types/Handler";

const index_home: HandlerType = (req, res, next) => {
  res.redirect("/login");
};

const user_login_get: HandlerType = (req, res, next) => {
  res.render("pages/login", { title: "User Login" });
};

const user_logout_post: HandlerType = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      console.log("User logged out successfully.");
      res.clearCookie("connect.sid", { path: "/", secure: false });
      return res.redirect("/login");
    });
  });
};

const user_dashboard_get: HandlerType = (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }

  res.render("pages/dashboard", { title: "Dashboard" });
};

export default {
  index_home,
  user_login_get,
  user_dashboard_get,
  user_logout_post,
};
