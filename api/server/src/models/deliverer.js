'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deliverer = sequelize.define('Deliverer', {
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      },
    },
  });

  Deliverer.associate = function(models) {
    Deliverer.belongsTo(models.User);
  };
  
  return Deliverer;
};