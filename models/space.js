'use strict';
//const Card_Space = require('./card_space');
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    desc: DataTypes.STRING
  }, {});
  Space.associate = function(models) {
    Space.hasMany(models.Card);
  };
  Space.associate = function(models) {
    Space.hasMany(models.Card_Space);
  };
  return Space;
};
