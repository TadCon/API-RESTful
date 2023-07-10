import express from "express";
import UserController from "../controller/userController.js";
import passport from "../Authentication/passport-config.js";
import jwt from "jsonwebtoken";

export default class Auth {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
  }

  start() {
    /* SIGNUP */
    this.router.post(
      "/signup",
      passport.authenticate("signup", { session: false }),
      async (req, res) => {
        res.status(200).json({
          message: "Signup successful",
          user: req.user,
        });
      }
    );

    /* LOGIN */
    this.router.post("/login", async (req, res, next) => {
      passport.authenticate("login", async (err, user, info) => {
        try {
          if (err || !user) {
            return res
              .status(401)
              .json({ error: "Authentication failed, invalid credentials" });
          }
          req.login(user, { session: false }, async (err) => {
            if (err) {
              return next(err);
            }
            const body = { _id: user._id, name: user.name };
            const token = jwt.sign({ user: body }, process.env.AUTH, { expiresIn: "7d"}); //Generate token
            res.cookie("token", token, {
              httpOnly: true,
            }); //Set cookie with token
            return res.status(200).json({ token });
          });
        } catch (e) {
          return next(e);
        }
      })(req, res, next);
    });

    return this.router;
  }
}
