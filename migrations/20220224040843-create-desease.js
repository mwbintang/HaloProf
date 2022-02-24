'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Deseases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      level: {
        type: Sequelize.INTEGER
      },
      symptomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Symptoms',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Deseases');
  }
};