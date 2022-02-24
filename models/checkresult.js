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
    get formatCreatedDate(){
      let date = new Date(this.createdAt);
      let month =date.getMonth() < 10 ? `0${date.getMonth()}` :  `${date.getMonth()}`;
      let day = date.getDate() < 10 ? `0${date.getDate()}` :  `${date.getDate()}`;
      return `${date.getFullYear()}-${month}-${day}`;
    }

    static associate(models) {
      CheckResult.belongsTo(models.User, {foreignKey:"userId"});
      CheckResult.belongsTo(models.Desease, {foreignKey:"deseaseId"});
      CheckResult.belongsTo(models.Doctor, {foreignKey:"doctorId"});
    }
  }
  CheckResult.init({
    userId: DataTypes.INTEGER,
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