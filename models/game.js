'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    url: {
       type: DataTypes.VIRTUAL,
       get() {
         return '/play/game/' + this.getDataValue('id')
       }
    }
  }, {});
  Game.associate = function(models) {
    Game.hasMany(models.Space);
    Game.hasMany(models.Card);
  };
  return Game;
};
