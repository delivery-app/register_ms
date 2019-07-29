import UserService from '../services/userService';
import Util from '../utils/Utils';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    UserService.getAllUsers()
    .then(function(allUsers) {
      if (allUsers.length > 0) {
        util.setSuccess(200, 'Users retrieved', allUsers);
      } else {
        util.setSuccess(404, 'No user found');
      }
      return util.send(res);

    }).catch(function(error) {
      util.setError(400, error);
      return util.send(res);
    });
  }

  static addUser(req, res) {
    if (!req.body.user.email || !req.body.user.password_digest || !req.body.user.name
        || !req.body.user.image_path || !req.body.user.id_document || !req.body.user.phone) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    
    const newUser = req.body.user;
    UserService.addUser(newUser)
    .then(function(createdUser) {
      util.setSuccess(201, 'User Added!', createdUser);
      return createdUser;
    
    }).catch(function(error){
      util.setError(400, error.message);
      return util.send(res);
    });
  }

  static async updatedUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updateUser = await UserService.updateUser(id, alteredUser);
      
      if (!updateUser) {
        util.setError(404, `Cannot find user with the id: ${id}`);
      } else {
        util.setSuccess(200, 'User updated', updateUser);
      }
      return util.send(res);
    
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    UserService.getAUser(id)
    .then(function(theUser) {
      util.setSuccess(200, 'Found User', theUser);
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Cannot find user with the id ${id}`);
      return util.send(res);
    });
  }

  static isUser(req, res) {
    if (!req.body.email || !req.body.password_digest) {
      util.setError(400, 'Please provide complete details for login');
      return util.send(res);
    }

    const {email, password_digest} = req.body
    
    UserService.checkUser(email, password_digest)
    .then(function(user){
      if (user){
        util.setSuccess(200, 'Found User', user);
        return util.send(res);
      } else {
        util.setError(404, 'Wrong email or password');
        return util.send(res);
      }
    
    }).catch(function(error) {
      util.setError(400, error.message);
      return util.send(res);
    });
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    UserService.deleteUser(id)
    .then(function() {
      util.setSuccess(200, 'User deleted')
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `User with the id ${id} cannot be found`);
      return util.send(res);
    });
  }
}

export default UserController;