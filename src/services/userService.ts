import { UserInterface } from '@src/interfaces/userInterface';
import { UserModel } from '@src/models/user';

export class UserService {
  static async addUser(userData: UserInterface) {
    try {
      const newUser: UserInterface = {
        userName: userData.userName,
        lastName: userData.lastName,
        firstName: userData.firstName,
        email: userData.email,
        date: new Date(),
      };
      console.log('userData: ', newUser);
      const response = await new UserModel(newUser).save();
      return response;
    } catch (err) {
      return err;
    }
  }

  static async getAll() {
    try {
      const allUser = await UserModel.find();
      return allUser;
    } catch (err) {
      return err;
    }
  }

  static async getUserById(id: string) {
    try {
      const user = await UserModel.findById({ _id: id })
      return user;
    } catch (err) {
      return err;
    }
  }

  static async update(id: string, user: Partial<UserInterface>) {
    try {
      const updateResponse = await UserModel.updateOne(
        { _id: id },
        {...user, date: new Date()}
      )
      return updateResponse;
    } catch (err) {
      return err
    }
  }

  static async delete(id: string) {
    try {
      const deleteReponse = await UserModel.findOneAndDelete({ _id: id });
      return deleteReponse
    } catch (err) {
      return err
    }
  }
}
