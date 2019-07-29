import database from '../src/models';
import Hasher from '../utils/hasher';

class UserService {
  static getAllUsers() {
    return database.User.findAll({
      attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone'],
    }).catch(function(error) {throw error});
  }

  static async addUser(newUser) {
    var user = newUser;
    user.password_digest = await Hasher.hashPass(newUser.password_digest);
    return database.User.create(user).catch(function(error) {throw error});
  }

  static updateUser(id, updateUser) {
    try {
      const userToUpdate = database.User.findOne({
        where: { id: Number(id) }
      });

      if (userToUpdate) {
        database.User.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static getAUser(id) {
    try {
      const theUser = database.User.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone'],
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async checkUser(email, password_digest) {
    try {
      const user = await database.User.findOne({
        where: { email: email },
        attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone', 'password_digest'],
        include: [{
            model: database.FinalUser,
            attributes: ['id', 'gender', 'birthdate']
        }],
      });
      
      console.log(user);
      var passMatch = await Hasher.hashCompare(password_digest, user.dataValues.password_digest);
      if (passMatch) {
        delete user.dataValues.password_digest;
        return user;
      } 
    } catch (error) {
      throw error;
    }
  }
  
  static deleteUser(id) {
    try {
      const userToDelete = database.User.findOne({ where: { id: Number(id) } });

      if (userToDelete) {
        const deletedUser = database.User.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;