import express from "express";
import UserController from "../controller/userController.js";

export default class Router {
    constructor() {
      this.router = express.Router();
      this.userCcontroller = new UserController();
    }

    start() {
    this.router.get("/", this.userCcontroller.getUsers);

    return this.router;
    }
}
