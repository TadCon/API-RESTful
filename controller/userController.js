import UserService from "../service/userService.js";

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  getUsers = async (req, res) => {
    try {
      const users = await this.userService.getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      res.status(500).send("Error en el servidor");
    }
  };
}
