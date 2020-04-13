'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Games',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
      .then(() => {
        return queryInterface.addColumn(
          'Spaces',
          'GameId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Games',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          }
        );
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Games',
      'UserId'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'Spaces',
          'GameId'
        );
      });
    }
};
