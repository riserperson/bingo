const Sequelize = require('sequelize');
const SpaceModel = require('./models/space');
const GameModel = require('./models/game');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bingo.db'
});

sequelize
  .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });

const Space = SpaceModel(sequelize, Sequelize);
const Game = GameModel(sequelize, Sequelize);

Game.hasMany(Space);
Space.belongsTo(Game);

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!')
  })

module.exports = {
  Space,
  Game
}
