'use strict';
//const Card_Space = require('./card_space');
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
    Card.belongsToMany(models.Space, { through: 'Card_Space' });
  };
 return Card;
};
