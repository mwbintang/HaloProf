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
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    deseaseId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'Deseases',
        key: 'id'
      }
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    medicine: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CheckResult',
  });
  return CheckResult;
};