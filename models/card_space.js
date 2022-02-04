'use strict'; module.exports = (sequelize, DataTypes) => {
  const Card_Space = sequelize.define('Card_Space', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    checked: DataTypes.BOOLEAN,
    position: DataTypes.INTEGER
  }, {});
  Card_Space.associate = function(models) {
    Card_Space.belongsTo(models.Card);
    Card_Space.belongsTo(models.Space);
  };
 return Card_Space;
}
 
