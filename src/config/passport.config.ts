import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import { User as UserType } from "../types/User";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, (user as UserType).id);
});
passport.deserializeUser(async (id: string, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;
