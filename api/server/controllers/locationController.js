import LocationService from '../services/locationService';
import Util from '../utils/Utils';

const util = new Util();

class LocationController {
  static async getAllLocations(req, res) {
    LocationService.getAllLocations()
    .then(function(allLocations) {
      if (allLocations.length > 0) {
        util.setSuccess(200, 'Locations retrieved', allLocations);
      } else {
        util.setSuccess(200, 'No location found');
      }
      return util.send(res);

    }).catch(function(error) {
      util.setError(400, error);
      return util.send(res);
    });
  }

  static addLocation(req, res) {
    if (!req.body.location.address || !req.body.location.lat || !req.body.location.long
        || !req.body.location.name || (!req.body.location.FinalUserId && !req.body.location.SupplierId)) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }

    const newLocation = req.body.location;
    LocationService.addLocation(newLocation)
    .then(function(createdLocation) {
      util.setSuccess(201, 'Location Added!', createdLocation);
      return createdLocation;
    
    }).catch(function(error){
      util.setError(400, error.message);
      return util.send(res);
    });
  }

  static async updatedLocation(req, res) {
    const alteredLocation = req.body;
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const updateLocation = await LocationService.updateLocation(id, alteredLocation);
      
      if (!updateLocation) {
        util.setError(404, `Cannot find location with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Location updated', updateLocation);
      }
      return util.send(res);
    
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getALocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    LocationService.getALocation(id)
    .then(function(theLocation) {
      util.setSuccess(200, 'Found Location', theLocation);
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Cannot find location with the id ${id}`);
      return util.send(res);
    });
  }

  static async deleteLocation(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    LocationService.deleteLocation(id)
    .then(function() {
      util.setSuccess(200, 'Location deleted')
      return util.send(res);
    
    }).catch(function() {
      util.setError(404, `Location with the id ${id} cannot be found`);
      return util.send(res);
    });
  }
}

export default LocationController;