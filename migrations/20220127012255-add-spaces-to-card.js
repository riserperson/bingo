'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
       queryInterface.addColumn('Cards', 'bingoProgress', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
       queryInterface.removeColumn('Cards', 'bingoProgress', { transaction: t })
      ]);
    });
  }
};
