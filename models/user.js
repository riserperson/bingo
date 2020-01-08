// Require all the stuff
var Sequelize = require('sequelize'),
  passportLocalSequelize = require('passport-local-sequelize');

// Set up sequelize db connection (reconcile this later with the other db initialized elsewhere)
var mydb = new Sequelize('mydb', 'myuser', 'mypass', {
  dialect: 'sqlite',
  storage: 'mydb.sqlite'
});

// A helper to define the User model with username and password fields

var User = passportLocalSequelize.defineUser(mydb, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = User; 
