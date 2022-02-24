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

    get checkupDate(){
      let date = new Date(this.createdAt);
      let month =date.getMonth() < 10 ? `0${date.getMonth()}` :  `${date.getMonth()}`;
      let day = date.getDate() < 10 ? `0${date.getDate()}` :  `${date.getDate()}`;
      return `${date.getFullYear()}-${month}-${day}`;
    }

    static associate(models) {
      CheckResult.belongsTo(models.User, {foreignKey: "patientId", as: 'Patient'});
      CheckResult.belongsTo(models.User, {foreignKey: "doctorId", as: 'Doctor'});
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