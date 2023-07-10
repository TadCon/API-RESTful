import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cookieJwtAuth from "./middleware/cookieJwtAuth.js";

import Router from "./router/routes.js";
import Auth from "./router/authRoutes.js";
import DBConnection from "./database/DBConnection.js";

export default class Server {
  constructor() {
    dotenv.config();
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.router = new Router();
    this.auth = new Auth();
  }

  async start() {
    /* EXPRESS CONFIG */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());

    /* ROUTES */
    this.app.use("/api/users", cookieJwtAuth, this.router.start());
    this.app.use("/", this.auth.start());



    /* DB CONNECTION  */
    await DBConnection.connectDB();

    /* SERVER */
    this.server = this.app.listen(this.port, () =>
      console.log(
        `Servidor http express escuchando en http://localhost:${this.port}`
      )
    );

    this.server.on("error", (error) =>
      console.log(`Error en el servidor: ${error.message}`)
    );

    return this.app;
  }

  async stop() {
    this.server.close();
    await DBConnection.disconnectDB();
  }
}
