import UserModel from './user.schema.js';

const UserRepository = {
  async createUser(userData) {
    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email: userData.email });
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }
      // Create the new user
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error(`${error.name}: ${error.code}`);
    }
  },
};

export default UserRepository;
