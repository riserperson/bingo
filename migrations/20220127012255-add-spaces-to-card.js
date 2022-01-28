'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Cards', 'space1', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space2', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space3', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space4', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space5', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space6', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space7', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space8', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space9', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space10', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space11', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space12', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space13', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space14', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space15', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space16', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space17', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space18', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space19', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space20', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space21', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space22', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space23', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'space24', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t }),
        queryInterface.addColumn('Cards', 'bingoProgress', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t })
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Cards', 'space1', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space2', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space3', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space4', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space5', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space6', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space7', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space8', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space9', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space10', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space11', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space12', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space13', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space14', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space15', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space16', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space17', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space18', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space19', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space20', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space21', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space22', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space23', { transaction: t }),
        queryInterface.removeColumn('Cards', 'space24', { transaction: t }),
        queryInterface.removeColumn('Cards', 'bingoProgress', { transaction: t })
      ]);
    });
  }
};
