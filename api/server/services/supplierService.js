import database from '../src/models';

class SupplierService {
  static async getAllSuppliers() {
    try {
      return await database.Supplier.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addSupplier(newSupplier) {
    try {
      return await database.Supplier.create(newSupplier);
    } catch (error) {
      throw error;
    }
  }

  static async updateSupplier(id, updateSupplier) {
    try {
      const supplierToUpdate = await database.Supplier.findOne({
        where: { id: Number(id) }
      });

      if (supplierToUpdate) {
        await database.Supplier.update(updateSupplier, { where: { id: Number(id) } });

        return updateSupplier;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getASupplier(id) {
    try {
      const theSupplier = await database.Supplier.findOne({
        where: { id: Number(id) }
      });

      return theSupplier;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSupplier(id) {
    try {
      const supplierToDelete = await database.Supplier.findOne({ where: { id: Number(id) } });

      if (supplierToDelete) {
        const deletedSupplier = await database.Supplier.destroy({
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