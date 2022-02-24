'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CheckResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CheckResult.init({
    patientId: DataTypes.INTEGER,
    deseaseId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    medicine: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CheckResult',
  });
  return CheckResult;
};