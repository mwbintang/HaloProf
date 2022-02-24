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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'username is required'
        },
        notNull: {
          msg: 'username is required'
        }
      }
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        msg:'email is required'
      },
      notNull: {
        msg: 'email is required'
      }
    }
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{
        msg:'password is required'
      },
      notNull: {
        msg: 'password is required'
      }
    }
  },
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