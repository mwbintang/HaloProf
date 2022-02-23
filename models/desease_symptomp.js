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
    }
  }
  Desease_Symptomp.init({
    deseaseId: {
      type: DataTypes.INTEGER
    },
    symptompId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Desease_Symptomp',
  });
  return Desease_Symptomp;
};