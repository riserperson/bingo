'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    hashedId: DataTypes.STRING
  }, {});
  Card.associate = function(models) {
    Card.hasMany(models.Card_Space);
  };
 return Card;
};
