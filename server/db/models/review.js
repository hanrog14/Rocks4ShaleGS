const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comments: {
    type: Sequelize.TEXT
  }
})

module.exports = Review
