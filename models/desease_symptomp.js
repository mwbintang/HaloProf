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
      desease_symptomp.belongsTo(models.Deseases, { foreignKey:"deseaseId"});
      desease_symptomp.belongsTo(models.Symptomp, { foreignKey:"symptompId"});
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