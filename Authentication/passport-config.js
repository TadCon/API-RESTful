import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserService from "../Service/userService.js";

//TODO - Considerar que passport sea una clase

const userService = new UserService();

passport.use(
  "signup",
  new LocalStrategy(
    { usernameField: "name", passwordField: "password" },
    async (name, password, done) => {
      try {
        const user = await userService.create({ name, password });

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
        const user = await userService.getByName({ name });
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
