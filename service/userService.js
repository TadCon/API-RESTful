import User from "../database/userModel.js";

export default class Service {
  constructor() {
    this.model = User;
  }

  getAll = async () => {
    return await this.model.find();
  };

  getById = async (id) => {
    return await this.model.findById(id);
  };

  create = async (object) => {
    return await this.model.create(object);
  };

  update = async (id, object) => {
    return await this.model.findByIdAndUpdate(id, object, {
      new: true,
    });
  };

  deleteById = async (id) => {
    return await this.model.findByIdAndDelete(id);
  };
}
