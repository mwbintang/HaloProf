'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptomp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Symptomp.belongsTo(models.Desease_Symptomp, { foreignKey:"symptompId"});
    }
  }
  Symptomp.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Symptomp',
  });
  return Symptomp;
};