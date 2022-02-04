'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    if (process.env.DATABASE_URL != 'production') {
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
        })
        .then(() => {
          return queryInterface.addColumn(
            'Card_Spaces',
            'CardId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Cards',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        })
        .then(() => {
          return queryInterface.addColumn(
            'Card_Spaces',
            'SpaceId',
            {
              type: Sequelize.INTEGER,
              references: {
                model: 'Spaces',
                key: 'id',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            }
          );
        });
    }
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
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Cards',
        'GameId'
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'Cards',
        'GameId'
      );
    });
  }
};
