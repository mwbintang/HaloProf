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
      CheckResult.belongsTo(models.User, {foreignKey: "patientId"});
      CheckResult.belongsTo(models.User, {foreignKey: "doctorId"});
      CheckResult.belongsTo(models.Desease, {foreignKey: "deseaseId"});
    }
  }
  CheckResult.init({
    patientId: DataTypes.INTEGER,
    deseaseId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    medicine: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CheckResult',
  });
  return CheckResult;
};