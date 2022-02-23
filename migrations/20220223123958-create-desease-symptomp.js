'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('desease_symptomps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      deseaseId:{
        type: Sequelize.INTEGER,
        references: {
          model: "Deseases",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      symptompId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Symptomps",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    return queryInterface.dropTable('desease_symptomps');
  }
};