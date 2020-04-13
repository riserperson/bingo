'use strict';
module.exports = (sequelize, DataTypes) => {
  const space = sequelize.define('space', {
    user_created: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {});
  space.associate = function(models) {
    // associations can be defined here
  };
  return space;
};