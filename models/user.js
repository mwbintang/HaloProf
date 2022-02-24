'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.CheckResult, {foreignKey: "patientId", as:"Patients"});
      User.hasMany(models.CheckResult, {foreignKey: "doctorId",as:"Doctors"});
      User.belongsTo(models.Profile,{foreignKey: "profileId"});
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    profileId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Profiles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};