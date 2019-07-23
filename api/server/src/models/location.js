'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FinalUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'FinalUsers',
        key: 'id'
      },
    },
    SupplierId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Suppliers',
        key: 'id'
      },
    },
  });
  Location.associate = function(models) {
    Location.belongsTo(models.FinalUser);
    Location.belongsTo(models.Supplier);
  };
  return Location;
};