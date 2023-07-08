import User from "../database/userModel.js";
import { validateObjectKeys, validateObject } from "../utils/validations.js";

export default class Service {
  constructor() {
    this.model = User;
  }

  getAll = async () => {
    return await this.model.find();
  };

  getById = async (id) => {
    validateObject(id);
    return await this.model.findById(id);
  };

  create = async (object) => {
    validateObjectKeys(object);
    return await this.model.create(object);
  };

  update = async (id, object) => {
    validateObjectKeys(object);
    return await this.model.findByIdAndUpdate(id, object, {
      new: true,
    });
  };

  deleteById = async (id) => {
    validateObject(id);
    return await this.model.findByIdAndDelete(id);
  };
}
