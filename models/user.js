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
      User.hasMany(models.CheckResult, {foreignKey: "patientId", as:"userRecord"});
      User.hasMany(models.CheckResult, {foreignKey: "doctorId",as:"patientRecord"});
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
    hooks: {
      beforeCreate: function(user, options) {
        user.role = 'patient'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};