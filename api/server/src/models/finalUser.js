'use strict';

module.exports = (sequelize, DataTypes) => {
  const FinalUser = sequelize.define('FinalUser', {
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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

  FinalUser.associate = function(models) {
    FinalUser.belongsTo(models.User);
  };

  return FinalUser;
};