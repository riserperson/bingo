'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
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
    )
      .then(() => {
        return queryInterface.addColumn(
          'Cards',
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
  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Spaces',
      'GameId'
    )
    .then(() => {
      return queryInterface.removeColumn(
        'Cards',
        'GameId'
      );
    });
  }
};
