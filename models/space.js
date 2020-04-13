'use strict';
module.exports = (sequelize, DataTypes) => {
  const Space = sequelize.define('Space', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    space_desc: DataTypes.STRING
  }, {});
  Space.associate = function(models) {
    Space.belongsTo(models.Game);
  };
  return Space;
};
