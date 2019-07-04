import database from '../src/models';

class UserService {
  static getAllUsers() {
    return database.User.findAll({
      attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone'],
    }).catch(function(error) {throw error});
  }

  static addUser(newUser) {
    return database.User.create(newUser).catch(function(error) {throw error});
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

  static checkUser(email, password_digest) {
    try {
      const user = database.User.findOne({
        where: { email: email, password_digest: password_digest },
        attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone'],
        include: [{
            model: database.FinalUser,
            attributes: ['id', 'gender', 'birthdate']
        }],
      });
      
      return user;
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