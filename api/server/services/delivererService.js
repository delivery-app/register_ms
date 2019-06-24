import database from '../src/models';

class DelivererService {
  static getAllDeliverers() {
    return  database.Deliverer.findAll({
      attributes: ['id', 'birthdate'],
      include: [{
          model: database.User,
          attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
      }]
    }).catch(function(error) {throw error});
  }

  static addDeliverer(newDeliverer) {
    return database.Deliverer.create(newDeliverer).catch(function(error) {throw error});
  }

  static updateDeliverer(id, updateDeliverer) {
    try {
      const delivererToUpdate = database.Deliverer.findOne({
        where: { id: Number(id) }
      });

      if (delivererToUpdate) {
        database.Deliverer.update(updateDeliverer, { where: { id: Number(id) } });

        return updateDeliverer;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static getADeliverer(id) {
    try {
      const theDeliverer = database.Deliverer.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'birthdate'],
        include: [{
            model: database.User,
            attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
        }]
      });

      return theDeliverer;
    } catch (error) {
      throw error;
    }
  }

  static deleteDeliverer(id) {
    try {
      const delivererToDelete = database.Deliverer.findOne({ where: { id: Number(id) } });

      if (delivererToDelete) {
        const deletedDeliverer = database.Deliverer.destroy({
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