'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {                   // agregando columna rol a la bd
    await queryInterface.addColumn('users',
     'rol', {
        type: Sequelize.STRING
      }
     );
  },
  down: async (queryInterface, Sequelize) => {    // esto es necesario para agreagar la columna rol
    await queryInterface.addColumn('users');
  }
};