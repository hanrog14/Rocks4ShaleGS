const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Igneous', 'Sedimentary', 'Metamorphic', 'Miscellaneous']]
    }
  },
  pictureUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Product

