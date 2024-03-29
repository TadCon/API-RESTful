import express from "express";
import UserController from "../controller/userController.js";

export default class Router {
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();
  }

  start() {
    /* GET */
    this.router.get("/:id", this.controller.getById);
    this.router.get("/", this.controller.getAll);

    /* POST */
    //NOTE - user creation must be done through the authentication layer

    /* UPDATE */
    this.router.put("/:id", this.controller.update);

    /* DELETE */
    this.router.delete("/:id", this.controller.deleteById);

    return this.router;
  }
}
