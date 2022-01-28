'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return '/play/game/' + this.getDataValue('id')
        }
      } 
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Games');
  }
};
