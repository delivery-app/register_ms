import database from '../src/models';

class FinalUserService {
  static async getAllFinalUsers() {
    return database.FinalUser.findAll({
      attributes: ['id', 'gender', 'birthdate'],
      include: [{
          model: database.User,
          attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
      }]
    }).catch(function(error) {throw error});
  }

  static addFinalUser(newFinalUser) {
    return database.FinalUser.create(newFinalUser).catch(function(error) {throw error});
  }

  static updateFinalUser(id, updateFinalUser) {
    try {
      const finalUserToUpdate = database.FinalUser.findOne({
        where: { id: Number(id) }
      });

      if (finalUserToUpdate) {
        database.FinalUser.update(updateFinalUser, { where: { id: Number(id) } });

        return updateFinalUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static getAFinalUser(id) {
    try {
      const theFinalUser = database.FinalUser.findOne({
        where: { id: Number(id) },
        attributes: ['id', 'gender', 'birthdate'],
        include: [{
            model: database.User,
            attributes: ['id', 'email', 'name', 'image_path', 'id_document', 'phone']
        }],
      });

      return theFinalUser;
    } catch (error) {
      throw error;
    }
  }

  static deleteFinalUser(id) {
    try {
      const finalUserToDelete = database.FinalUser.findOne({ where: { id: Number(id) } });

      if (finalUserToDelete) {
        const deletedFinalUser = database.FinalUser.destroy({
          where: { id: Number(id) }
        });
        return deletedFinalUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default FinalUserService;