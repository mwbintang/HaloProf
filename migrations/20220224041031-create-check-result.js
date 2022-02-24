'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('CheckResults', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      patientId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      deseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Deseases',
          key: 'id'
        }
      },
      doctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      medicine: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('CheckResults');
  }
};