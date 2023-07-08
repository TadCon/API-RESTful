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
    this.router.post("/", this.controller.createUser);

    /* UPDATE */
    this.router.put("/:id", this.controller.updateUser);

    /* DELETE */

    return this.router;
    }
}
