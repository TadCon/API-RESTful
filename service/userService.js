import User from '../database/userModel.js';

class UserService {
  // Obtener todos los usuarios de la base de datos
  async getAllUsers() {
    return await User.find({});
  }
}

export default UserService;
