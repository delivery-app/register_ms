'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deliverer = sequelize.define('Deliverer', {
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  Deliverer.associate = function(models) {
    // associations can be defined here
  };
  return Deliverer;
};