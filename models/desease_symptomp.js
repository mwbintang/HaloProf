'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class desease_symptomp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  desease_symptomp.init({
    deseaseId: DataTypes.INTEGER,
    symptompId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'desease_symptomp',
  });
  return desease_symptomp;
};