module.exports = (sequelize, type) => {
  return sequelize.define('space', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_created: type.STRING,
    desc: type.STRING
  })
}
