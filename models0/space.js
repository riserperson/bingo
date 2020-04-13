module.exports = (sequelize, type) => {
  return sequelize.define('space', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_created: type.STRING,
    desc: type.STRING,
//    approval_date: type.DATE,
//    approved_by: type.STRING,
    url: {
      type: type.VIRTUAL,
      get() {
        return '/play/space/' + this.getDataValue('id')
      }
    }
  })
}
