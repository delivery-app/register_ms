'use strict';
module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    company_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Supplier.associate = function(models) {
    // associations can be defined here
  };
  return Supplier;
};