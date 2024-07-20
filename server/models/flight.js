'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.hasMany(models.Itinerary)
    }
  }
  Flight.init({
    departureCity: DataTypes.STRING,
    arrivalCity: DataTypes.STRING,
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    flightTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};