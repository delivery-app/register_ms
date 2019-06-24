'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = function(models) {
    User.hasOne(models.FinalUser, { onDelete: 'cascade', hooks: true });
    User.hasOne(models.Deliverer, { onDelete: 'cascade', hooks: true });
    User.hasOne(models.Supplier, { onDelete: 'cascade', hooks: true });
  };

  return User;
};