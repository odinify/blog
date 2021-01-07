const bcrypt = require('bcrypt');

const UserModel = require('../models/User');

class UserService {
  static async createUser(
    username,
    password,
    phoneNumber,
    name,
    role = 'user'
  ) {
    const userExists = await UserModel.findOne({ username });

    if (userExists) {
      throw new Error('USER_EXISTS');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      password: passwordHash,
      phoneNumber,
      name,
      role,
    });

    return newUser.save();
  }

  static async getUser(id, normalize = true) {
    const user = await UserModel.findById(id);

    if (normalize) {
      const normalizedUser = {
        id: user._id,
        role: user.role,
        username: user.username,
        phoneNumber: user.phoneNumber,
        name: user.name,
        createdAt: user.createdAt,
      };

      return normalizedUser;
    }

    return user;
  }

  static async getAllUsers(normalize = true) {
    const users = await UserModel.find({});

    if (normalize) {
      const normalizedUsers = users.map(user => {
        return {
          id: user._id,
          role: user.role,
          username: user.username,
          phoneNumber: user.phoneNumber,
          name: user.name,
          createdAt: user.createdAt,
        };
      });

      return normalizedUsers;
    }

    return users;
  }
}

module.exports = UserService;
