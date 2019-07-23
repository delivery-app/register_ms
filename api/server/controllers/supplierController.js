import SupplierService from '../services/supplierService';
import UserService from '../services/userService';
import Util from '../utils/Utils';

const util = new Util();

class SupplierController {
  static async getAllSuppliers(req, res) {
    SupplierService.getAllSuppliers()
    .then(function(allSuppliers) {
      if (allSuppliers.length > 0) {
        util.setSuccess(200, 'Suppliers retrieved', allSuppliers);
      } else {
        util.setSuccess(200, 'No supplier found');
      }
      return util.send(res);
    
    }).catch(function(error) {
      util.setError(400, error);
      return util.send(res);
    });
  }

  static async addSupplier(req, res) {
    if (!req.body.supplier.company_id|| 
      !req.body.user.email || !req.body.user.password_digest || 
      !req.body.user.name || !req.body.user.image_path || 
      !req.body.user.id_document || !req.body.user.phone) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newSupplier = req.body.supplier;
    const newUser = req.body.user
    UserService.addUser(newUser)
    .then(function(user){
      newSupplier.UserId = user.dataValues.id; 

      SupplierService.addSupplier(newSupplier)
        .then(function(createdSupplier){
          util.setSuccess(201, 'Supplier Added!', createdSupplier);
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

  static async updatedSupplier(req, res) {
    const alteredSupplier = req.body.supplier;
    const { id } = req.params;
    const alteredUser = req.body.user;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updateSupplier = await SupplierService.updateSupplier(id, alteredSupplier);
      
      if (!updateSupplier) {
        util.setError(404, `Cannot find supplier with the id: ${id}`);
      } else {
        
        SupplierService.getASupplier(id)
        .then(function(supplier) {
          let mainUserId = supplier.dataValues.User.id;
          const updatedUser = UserService.updateUser(mainUserId, alteredUser);
          util.setSuccess(200, 'Supplier updated', {updateSupplier, updatedUser});
          return util.send(res);
          
        }).catch(function() {
          util.setError(404, `Cannot find supplier with the id: ${id}`);
          return util.send(res);    
        });
      }
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getASupplier(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    SupplierService.getASupplier(id)
    .then(function(theSupplier) {
      util.setSuccess(200, 'Found Supplier', theSupplier);
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Cannot find supplier with the id ${id}`);
      return util.send(res);
    });
  }

  static deleteSupplier(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    SupplierService.getASupplier(id)
    .then(function(supplier) {
      let mainUserId = supplier.dataValues.User.id;
      
      UserService.deleteUser(mainUserId)
      .then(function() {
        util.setSuccess(200, 'Supplier deleted');
        return util.send(res);

      }).catch(function(error) {
        util.setError(400, error.message);
        return util.send(res);
      });
    }).catch(function() {
      util.setError(404, `Cannot find supplier with the id: ${id}`);
      return util.send(res);
    });
  }
}

export default SupplierController;