'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    rol: DataTypes.STRING,  // Se agrega manuealmente esto luego de la migracion
    estado: DataTypes.INTEGER  // Se agrega manuealmente esto luego de la migracion
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};