import DelivererService from '../services/delivererService';
import UserService from '../services/userService';
import Util from '../utils/Utils';

const util = new Util();

class DelivererController {
  static async getAllDeliverers(req, res) {
    DelivererService.getAllDeliverers()
    .then(function(allDeliverers) {
      if (allDeliverers.length > 0) {
        util.setSuccess(200, 'Deliverers retrieved', allDeliverers);
      } else {
        util.setSuccess(200, 'No deliverer found');
      }
      return util.send(res);
    
    }).catch(function(error) {
      util.setError(400, error);
      return util.send(res);
    });
  }

  static async addDeliverer(req, res) {
    if (!req.body.deliverer.gender || !req.body.deliverer.birthdate|| 
      !req.body.user.email || !req.body.user.password_digest || 
      !req.body.user.name || !req.body.user.image_path || 
      !req.body.user.id_document || !req.body.user.phone) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newDeliverer = req.body.deliverer;
    const newUser = req.body.user
    UserService.addUser(newUser)
    .then(function(user){
      newDeliverer.UserId = user.dataValues.id; 

      DelivererService.addDeliverer(newDeliverer)
        .then(function(createdDeliverer){
          util.setSuccess(201, 'Deliverer Added!', createdDeliverer);
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

  static async updatedDeliverer(req, res) {
    const alteredDeliverer = req.body.deliverer;
    const { id } = req.params;
    const alteredUser = req.body.user;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updateDeliverer = await DelivererService.updateDeliverer(id, alteredDeliverer);
      
      if (!updateDeliverer) {
        util.setError(404, `Cannot find deliverer with the id: ${id}`);
      } else {
        
        DelivererService.getADeliverer(id)
        .then(function(deliverer) {
          let mainUserId = deliverer.dataValues.User.id;
          const updatedUser = UserService.updateUser(mainUserId, alteredUser);
          util.setSuccess(200, 'Deliverer updated', {updateDeliverer, updatedUser});
          return util.send(res);
          
        }).catch(function() {
          util.setError(404, `Cannot find deliverer with the id: ${id}`);
          return util.send(res);    
        });
      }
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getADeliverer(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    DelivererService.getADeliverer(id)
    .then(function(theDeliverer) {
      util.setSuccess(200, 'Found Deliverer', theDeliverer);
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Cannot find deliverer with the id ${id}`);
      return util.send(res);
    });
  }

  static deleteDeliverer(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    DelivererService.getADeliverer(id)
    .then(function(deliverer) {
      let mainUserId = deliverer.dataValues.User.id;
      
      UserService.deleteUser(mainUserId)
      .then(function() {
        util.setSuccess(200, 'Deliverer deleted');
        return util.send(res);

      }).catch(function(error) {
        util.setError(400, error.message);
        return util.send(res);
      });
    }).catch(function() {
      util.setError(404, `Cannot find deliverer with the id: ${id}`);
      return util.send(res);
    });
  }
}

export default DelivererController;