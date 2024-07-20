'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AirportList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AirportList.init({
    icao: DataTypes.STRING,
    iata: DataTypes.STRING,
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    country: DataTypes.STRING,
    elevation_ft: DataTypes.INTEGER,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    timezone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AirportList',
  });
  return AirportList;
};