import database from '../src/models';

class DelivererService {
  static async getAllDeliverers() {
    try {
      return await database.Deliverer.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addDeliverer(newDeliverer) {
    try {
      return await database.Deliverer.create(newDeliverer);
    } catch (error) {
      throw error;
    }
  }

  static async updateDeliverer(id, updateDeliverer) {
    try {
      const delivererToUpdate = await database.Deliverer.findOne({
        where: { id: Number(id) }
      });

      if (delivererToUpdate) {
        await database.Deliverer.update(updateDeliverer, { where: { id: Number(id) } });

        return updateDeliverer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getADeliverer(id) {
    try {
      const theDeliverer = await database.Deliverer.findOne({
        where: { id: Number(id) }
      });

      return theDeliverer;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDeliverer(id) {
    try {
      const delivererToDelete = await database.Deliverer.findOne({ where: { id: Number(id) } });

      if (delivererToDelete) {
        const deletedDeliverer = await database.Deliverer.destroy({
          where: { id: Number(id) }
        });
        return deletedDeliverer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default DelivererService;