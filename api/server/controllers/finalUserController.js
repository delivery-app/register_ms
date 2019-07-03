import FinalUserService from '../services/finalUserService';
import UserService from '../services/userService';
import Util from '../utils/Utils';

const util = new Util();

class FinalUserController {
  static async getAllFinalUsers(req, res) {
    FinalUserService.getAllFinalUsers()
    .then(function(allFinalUsers) {
      if (allFinalUsers.length > 0) {
        util.setSuccess(200, 'FinalUsers retrieved', allFinalUsers);
      } else {
        util.setSuccess(200, 'No finaluser found');
      }
      return util.send(res);
    
    }).catch(function(error) {
      util.setError(400, error);
      return util.send(res);
    });
  }

  static async addFinalUser(req, res) {
    if (!req.body.finalUser.gender || !req.body.finalUser.birthdate|| 
      !req.body.user.email || !req.body.user.password_digest || 
      !req.body.user.name || !req.body.user.image_path || 
      !req.body.user.id_document || !req.body.user.phone) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newFinalUser = req.body.finalUser;
    const newUser = req.body.user
    UserService.addUser(newUser)
    .then(function(user){
      newFinalUser.UserId = user.dataValues.id; 

      FinalUserService.addFinalUser(newFinalUser)
        .then(function(createdFinalUser){
          util.setSuccess(201, 'FinalUser Added!', createdFinalUser);
          return util.send(res);

        }).catch(function(error){
          util.setError(400, error.message);
          return util.send(res);
        });
    }).catch(function(error){
      util.setError(400, error.message);
      return util.send(res);
    });
  }

  static async updatedFinalUser(req, res) {
    const alteredFinalUser = req.body.finalUser;
    const { id } = req.params;
    const alteredUser = req.body.user;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updateFinalUser = await FinalUserService.updateFinalUser(id, alteredFinalUser);
      
      if (!updateFinalUser) {
        util.setError(404, `Cannot find finaluser with the id: ${id}`);
      } else {
        
        FinalUserService.getAFinalUser(id)
        .then(function(finalUser) {
          let mainUserId = finalUser.dataValues.User.id;
          const updatedUser = UserService.updateUser(mainUserId, alteredUser);
          util.setSuccess(200, 'FinalUser updated', {updateFinalUser, updatedUser});
          return util.send(res);
          
        }).catch(function() {
          util.setError(404, `Cannot find finaluser with the id: ${id}`);
          return util.send(res);    
        });
      }
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAFinalUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    FinalUserService.getAFinalUser(id)
    .then(function(theFinalUser) {
      util.setSuccess(200, 'Found FinalUser', theFinalUser);
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Cannot find finaluser with the id ${id}`);
      return util.send(res);
    });
  }

  static deleteFinalUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    FinalUserService.getAFinalUser(id)
    .then(function(finalUser) {
      let mainUserId = finalUser.dataValues.User.id;
      
      UserService.deleteUser(mainUserId)
      .then(function() {
        util.setSuccess(200, 'Final user deleted');
        return util.send(res);

      }).catch(function(error) {
        util.setError(400, error.message);
        return util.send(res);
      });
    }).catch(function() {
      util.setError(404, `Cannot find finaluser with the id: ${id}`);
      return util.send(res);
    });
  }
}

export default FinalUserController;