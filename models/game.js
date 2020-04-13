'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    user_created: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};