'use strict'; module.exports = (sequelize, DataTypes) => {
  const Card_Space = sequelize.define('Card_Space', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    checked: DataTypes.BOOLEAN
  }, {});
 return Card_Space;
}
 
