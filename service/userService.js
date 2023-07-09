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

  getByName = async (object) => {
    validateObject(object);
    return await this.model.findOne({ name: object.name });
  };

  create = async (object) => {
    validateObjectKeys(object);
    console.log(this.getByName(object));
/*     if (await getByName(object)) {
      throw new Error("User already exists");
    } */
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
