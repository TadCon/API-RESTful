import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default class DBConnection {
  static client = null;
  static connectOk = false;

  static connectDB = async () => {
    try {
      await connect(process.env.MONGODB_URI);
      this.connectOk = true;
      console.log("Conexión exitosa a la base de datos");
    } catch (error) {
      console.error("Error al conectar a la base de datos: ", error);
    }
  };

  static disconnectDB = async () => {
    if (!this.connectOk) return;
    await mongoose.connection.close();
    this.connectOk = false;
  }
}
