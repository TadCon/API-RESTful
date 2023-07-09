import express from "express";
import UserController from "../controller/userController.js";
import passport from "../passport-config.js";
import jwt from "jsonwebtoken";

export default class Auth {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
  }

  start() {
    /* POST */
    this.router.post(
      "/signup",
      passport.authenticate("signup", { session: false }),
      async (req, res) => {
        res.json({
          message: "Signup successful",
          user: req.user,
        });
      }
    );
    this.router.post("/login", async (req, res, next) => {
      passport.authenticate("login", async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error("Invalid " + user);
            return next(error);
          }
          req.login(user, { session: false }, async (err) => {
            if (err) {
              return next(err);
            }
            const body = { _id: user._id, name: user.name };
            const token = jwt.sign({ user: body }, "top_secret"); //TODO - revisar clave de jwt
            return res.json({ token });
          });
        } catch (e) {
          return next(e);
        }
      })(req, res, next);
    });

    return this.router;
  }
}
