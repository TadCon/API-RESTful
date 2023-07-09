import express from "express";
import cors from "cors";
import passport from "./passport-config.js";

import Router from "./router/routes.js";
import DBConnection from "./database/DBConnection.js";

export default class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.router = new Router();
  }

  async start() {
    /* EXPRESS CONFIG */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    /* PASSPORT CONFIG */
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    /* ROUTES */
    this.app.use("/api/users", this.router.start());

    /* DBConnection conectar */
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

  stop() {
    this.server.close();
  }
}
