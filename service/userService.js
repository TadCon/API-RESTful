import User from "../database/userModel.js";

export default class UserService {
  constructor() {
    this.model = User;
  }

  getUsers = async() =>  {
    const users = await this.model.find()
    return users;
  }
}
