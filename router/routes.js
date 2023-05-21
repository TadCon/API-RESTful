import express from "express";
import UserController from "../controller/userController.js";

class UserRoutes {
  constructor() {
    this.userController = new UserController();
    this.router = express.Router();
  }

  start() {
    this.router.get("/", this.userController.getAllUsers);
    // Agrega más rutas según tus necesidades

    return this.router;
  }
}

export default UserRoutes;
