import database from '../src/models';

class FinalUserService {
  static async getAllFinalUsers() {
    try {
      return await database.FinalUser.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addFinalUser(newFinalUser) {
    try {
      return await database.FinalUser.create(newFinalUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateFinalUser(id, updateFinalUser) {
    try {
      const finaluserToUpdate = await database.FinalUser.findOne({
        where: { id: Number(id) }
      });

      if (finaluserToUpdate) {
        await database.FinalUser.update(updateFinalUser, { where: { id: Number(id) } });

        return updateFinalUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAFinalUser(id) {
    try {
      const theFinalUser = await database.FinalUser.findOne({
        where: { id: Number(id) }
      });

      return theFinalUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteFinalUser(id) {
    try {
      const finaluserToDelete = await database.FinalUser.findOne({ where: { id: Number(id) } });

      if (finaluserToDelete) {
        const deletedFinalUser = await database.FinalUser.destroy({
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