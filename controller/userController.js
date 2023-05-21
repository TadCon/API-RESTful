import UserService from "../service/userService.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Controlador para obtener todos los usuarios
  async getAllUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error en el servidor");
    }
  }
}

export default UserController;
