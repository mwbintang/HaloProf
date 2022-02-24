'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get name(){
      return this.firstName+" "+this.lastName
    }

    static associate(models) {
      Profile.hasOne(models.User,{foreignKey: "profileId"});
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'First Name is required'
        },
        notNull: {
          msg: 'First Name is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'Last Name is required'
        },
        notNull: {
          msg: 'Last Name is required'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Age is required'
        },
        min:{
          args: 1,
          msg: 'Age minimal 1'
        }, 
        notEmpty:{
          msg:'Age is required'
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty:{
          msg:'Gender is required'
        },
        notNull: {
          msg: 'Gender is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};