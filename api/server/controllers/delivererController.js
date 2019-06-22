import DelivererService from '../services/delivererService';
import Util from '../utils/Utils';

const util = new Util();

class DelivererController {
  static async getAllDeliverers(req, res) {
    try {
      const allDeliverers = await DelivererService.getAllDeliverers();
      if (allDeliverers.length > 0) {
        util.setSuccess(200, 'Deliverers retrieved', allDeliverers);
      } else {
        util.setSuccess(200, 'No deliverer found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addDeliverer(req, res) {
    if (!req.body.birthdate) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newDeliverer = req.body;
    try {
      const createdDeliverer = await DelivererService.addDeliverer(newDeliverer);
      util.setSuccess(201, 'Deliverer Added!', createdDeliverer);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedDeliverer(req, res) {
    const alteredDeliverer = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateDeliverer = await DelivererService.updateDeliverer(id, alteredDeliverer);
      if (!updateDeliverer) {
        util.setError(404, `Cannot find deliverer with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Deliverer updated', updateDeliverer);
      }
      return util.send(res);
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

    try {
      const theDeliverer = await DelivererService.getADeliverer(id);

      if (!theDeliverer) {
        util.setError(404, `Cannot find deliverer with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found Deliverer', theDeliverer);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteDeliverer(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const delivererToDelete = await DelivererService.deleteDeliverer(id);

      if (delivererToDelete) {
        util.setSuccess(200, 'Deliverer deleted');
      } else {
        util.setError(404, `Deliverer with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default DelivererController;