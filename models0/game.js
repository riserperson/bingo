module.exports = (sequelize, type) => {
  return sequelize.define('game', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_created: type.STRING,
    desc: type.STRING,
    url: {
      type: type.VIRTUAL,
      get() {
        return '/play/game/' + this.getDataValue('id')
      }
    }
//    number_of_players: {
//      type: type.INTEGER,
//      primaryKey: false,
//      required: true
//    } 
  })
}
