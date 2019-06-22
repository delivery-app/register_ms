import database from '../src/models';

class LocationService {
  static async getAllLocations() {
    try {
      return await database.Location.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addLocation(newLocation) {
    try {
      return await database.Location.create(newLocation);
    } catch (error) {
      throw error;
    }
  }

  static async updateLocation(id, updateLocation) {
    try {
      const locationToUpdate = await database.Location.findOne({
        where: { id: Number(id) }
      });

      if (locationToUpdate) {
        await database.Location.update(updateLocation, { where: { id: Number(id) } });

        return updateLocation;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getALocation(id) {
    try {
      const theLocation = await database.Location.findOne({
        where: { id: Number(id) }
      });

      return theLocation;
    } catch (error) {
      throw error;
    }
  }

  static async deleteLocation(id) {
    try {
      const locationToDelete = await database.Location.findOne({ where: { id: Number(id) } });

      if (locationToDelete) {
        const deletedLocation = await database.Location.destroy({
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