'use strict';

var passportLocalSequelize = require('passport-local-sequelize');

module.exports = (sequelize, DataTypes) => {
  var User = passportLocalSequelize.defineUser(sequelize, {
    email: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasMany(models.Game);
  };
  return User;
};
