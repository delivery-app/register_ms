import FinalUserService from '../services/finalUserService';
import Util from '../utils/Utils';

const util = new Util();

class FinalUserController {
  static async getAllFinalUsers(req, res) {
    try {
      const allFinalUsers = await FinalUserService.getAllFinalUsers();
      if (allFinalUsers.length > 0) {
        util.setSuccess(200, 'FinalUsers retrieved', allFinalUsers);
      } else {
        util.setSuccess(200, 'No finaluser found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addFinalUser(req, res) {
    if (!req.body.gender || !req.body.birthdate) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newFinalUser = req.body;
    try {
      const createdFinalUser = await FinalUserService.addFinalUser(newFinalUser);
      util.setSuccess(201, 'FinalUser Added!', createdFinalUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedFinalUser(req, res) {
    const alteredFinalUser = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateFinalUser = await FinalUserService.updateFinalUser(id, alteredFinalUser);
      if (!updateFinalUser) {
        util.setError(404, `Cannot find finaluser with the id: ${id}`);
      } else {
        util.setSuccess(200, 'FinalUser updated', updateFinalUser);
      }
      return util.send(res);
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

    try {
      const theFinalUser = await FinalUserService.getAFinalUser(id);

      if (!theFinalUser) {
        util.setError(404, `Cannot find finaluser with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found FinalUser', theFinalUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteFinalUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const finaluserToDelete = await FinalUserService.deleteFinalUser(id);

      if (finaluserToDelete) {
        util.setSuccess(200, 'FinalUser deleted');
      } else {
        util.setError(404, `FinalUser with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default FinalUserController;