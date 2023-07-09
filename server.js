import express from "express";
import cors from "cors";

import Router from "./router/routes.js";
import Auth from "./router/authRoutes.js";
import DBConnection from "./database/DBConnection.js";


export default class Server {
  constructor() {
    this.app = express();
    this.port = 8080;
    this.router = new Router();
    this.auth = new Auth();
  }

  async start() {
    /* EXPRESS CONFIG */
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    /* PASSPORT CONFIG */
/*     this.app.use(passport.initialize());
    this.app.use(passport.session()); */

    /* ROUTES */
    this.app.use("/api/users", this.router.start());
    this.app.use("/api/users", this.auth.start());

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
