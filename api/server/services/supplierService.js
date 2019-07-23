import database from '../src/models';

class SupplierService {
  static getAllSuppliers() {
    return  database.Supplier.findAll({
      attributes: ['id', 'company_id'],
      include: [{
          model: database.User,
          attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
      }]
    }).catch(function(error) {throw error});
  }

  static addSupplier(newSupplier) {
    return database.Supplier.create(newSupplier).catch(function(error) {throw error});
  }

  static updateSupplier(id, updateSupplier) {
    try {
      const supplierToUpdate = database.Supplier.findOne({
        where: { id: Number(id) }
      });

      if (supplierToUpdate) {
        database.Supplier.update(updateSupplier, { where: { id: Number(id) } });

        return updateSupplier;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static getASupplier(id) {
    try {
      const theSupplier = database.Supplier.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'company_id'],
        include: [{
            model: database.User,
            attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
        }]
      });

      return theSupplier;
    } catch (error) {
      throw error;
    }
  }

  static deleteSupplier(id) {
    try {
      const supplierToDelete = database.Supplier.findOne({ where: { id: Number(id) } });

      if (supplierToDelete) {
        const deletedSupplier = database.Supplier.destroy({
          where: { id: Number(id) }
        });
        return deletedSupplier;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierService;