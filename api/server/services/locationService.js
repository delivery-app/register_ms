import database from '../src/models';

class LocationService {
  static getAllLocations() {
    return  database.Location.findAll().catch(error => {throw error});
  }

  static addLocation(newLocation) {
    console.log(newLocation)
    return database.Location.create(newLocation).catch(error => {throw error});
  }

  static updateLocation(id, updateLocation) {
    try {
      const locationToUpdate = database.Location.findOne({
        where: { id: Number(id) }
      });

      if (locationToUpdate) {
        database.Location.update(updateLocation, { where: { id: Number(id) } });

        return updateLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static getALocation(id) {
    try {
      const theLocation = database.Location.findOne({
        where: { id: Number(id) }
      });

      return theLocation;
    } catch (error) {
      throw error;
    }
  }

  static deleteLocation(id) {
    try {
      const locationToDelete = database.Location.findOne({ where: { id: Number(id) } });

      if (locationToDelete) {
        const deletedLocation = database.Location.destroy({
          where: { id: Number(id) }
        });
        return deletedLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default LocationService;