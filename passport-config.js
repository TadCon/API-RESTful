import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./database/userModel.js";

passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "name", passwordField: "password" },
    async (name, password, done) => {
      try {
        const user = await User.create({ name, password });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "name", passwordField: "password" },
    async (name, password, done) => {
      try {
        const user = await User.findOne({ name });
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        return done(null, user, { message: "Login successful" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
