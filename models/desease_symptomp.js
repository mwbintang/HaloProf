'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Desease_Symptomp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Desease_Symptomp.belongsTo(models.Desease, {foreignKey: 'deseaseId'})
      Desease_Symptomp.belongsTo(models.Symptomp, {foreignKey: 'symptompId'})
    }
  }
  Desease_Symptomp.init({
    deseaseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Deseases",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    symptompId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Symptomps",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  }, {
    sequelize,
    modelName: 'Desease_Symptomp',
  });
  return Desease_Symptomp;
};