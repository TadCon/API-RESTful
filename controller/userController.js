import UserService from "../Service/userService.js";
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
    try {
      const object = await this.service.getById(req.params.id);
      return res.status(200).json(object);
    } catch (error) {
      console.error("Error getting object by id: ", error);
      return res.status(500).send("Check id");
    }
  };

  /* POST */
  create = async (req, res) => {
    try {
      const object = await this.service.create(req.body);
      return res.status(200).json(object);
    } catch (error) {
      console.error("Error creating object: ", error);
      return res.status(500).send("Check the fields");
    }
  };

  /* PUT */
  update = async (req, res) => {
    try {
      const object = await this.service.update(req.params.id, req.body);
      return res.status(200).json(object);
    } catch (err) {
      console.log("Error updating user: ", err);
      return res.status(500).send("Check the fields");
    }
  };

  /* DELETE */
  deleteById = async (req, res) => {
    try {
      const object = await this.service.deleteById(req.params.id);
      return res.status(200).json(object);
    } catch (error) {
      console.error("Error deleting object by id: ", error);
      return res.status(500).send("Check id");
    }
  };
}
