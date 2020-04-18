'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      email: {
         type: Sequelize.STRING,
         unique: true
      },
      hash: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      salt: {
          type: Sequelize.STRING,
          allowNull: false
      },
      activationKey: {
          type: Sequelize.STRING,
          allowNull: true
      },
      resetPasswordKey: {
          type: Sequelize.STRING,
          allowNull: true
      },
      verified: {
          type: Sequelize.BOOLEAN,
          allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
   });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
