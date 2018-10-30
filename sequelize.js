const Sequelize = require('sequelize')
const ProfModel = require('./models/professeur')

const sequelize = new Sequelize('null', 'null', 'null', {
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  storage: './test.sqlite'
})



const Professeur = ProfModel(sequelize, Sequelize)


sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  Professeur
}