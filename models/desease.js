'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Desease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Desease.hasMany(models.desease_symptomp, {foreignKey: 'symptompId'})
    }
  }
  Desease.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Desease',
  });
  return Desease;
};