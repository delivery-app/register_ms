'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      long: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      FinalUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'FinalUsers',
          key: 'id'
        },
        onDelete: 'cascade',
      },
      SupplierId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Suppliers',
          key: 'id'
        },
        onDelete: 'cascade',
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Locations');
  }
};