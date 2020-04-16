'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    group_name: DataTypes.STRING,
    group_activity: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    time_zone: DataTypes.INTEGER,
    url: {
       type: DataTypes.VIRTUAL,
       get() {
         return '/play/game/' + this.getDataValue('id')
       }
    }
  }, {});
  Game.associate = function(models) {
    Game.belongsTo(models.User);
    Game.hasMany(models.Space);
  };
  return Game;
};
