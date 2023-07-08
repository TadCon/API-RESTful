import UserService from "../Service/userService.js";
import { validateObjectKeys} from "../utils/validations.js";
export default class UserController {
  constructor() {
    this.service = new UserService();
  }

  /* GET */
  getAll = async (req, res) => {
    try {
      const object = await this.service.getAll();
      res.status(200).json(object);
    } catch (error) {
      console.error("Error getting all objects:", error);
      res.status(500).send("Server error", error);
    }
  };

  getById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Empty id");
    }
    try {
      const object = await this.service.getById(id);
      return res.status(200).json(object);
    } catch (error) {
      console.error("Error getting object by id: ", error);
      return res.status(500).send("Check id");
    }
  };

  /* POST */
  create = async (req, res) => {
    validateObjectKeys(req, res)
    try {
      const object = await this.service.create(req.body);
      return res.status(200).json(object);
    } catch (error) {
      console.error("Error creating object: ", error);
      return res.status(500).send("Check your fields");
    }
  };

  /* PUT */
  update = async (req, res) => {
    validateObjectKeys(req, res)
    try {
      const { id } = req.params;
      const object = await this.service.update(id, req.body);
      return res.status(200).json(object);
    } catch (err) {
      console.log("Error updating user: ", err);
      return res.status(500).send("Check your fields");
    }
  };

  /* DELETE */
  deleteUserById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("Empty id");
    }
    try {
      const user = await this.service.deleteUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user by id: ", error);
      return res.status(500).send("Check id");
    }
  };
}
