'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {                   // agregando columna estado a la bd
    await queryInterface.addColumn('users',
     'estado', {
        type: Sequelize.INTEGER,
        defaultValue: 1
      }
     );
    },
  down: async (queryInterface, Sequelize) => {    // esto es necesario para agreagar la columna estado
    await queryInterface.addColumn('users');
  }
};