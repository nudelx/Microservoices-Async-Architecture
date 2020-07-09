const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('services-poc', 'root', '', {
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 1000,
  },
})
const check = async () => {
  await sequelize.sync()
}

const Messages = sequelize.define(
  'messages',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)
check()

module.exports = Messages
