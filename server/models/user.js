'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Itinerary)
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is required!`
        },
        notEmpty: {
          msg: `Email is required!`
        },
        isEmail: true,
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is required!`
        },
        notEmpty: {
          msg: `Password is required!`
        },
        len: {
          args: [5],
          msg: `Password min 5!`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Role is required!`
        }
      },
      defaultValue: 'user'
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date(),
    el.password = hashPassword(el.password)
  })
  return User;
};