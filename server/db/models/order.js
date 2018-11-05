const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  shippingStatus: {
    type: Sequelize.ENUM('processing', 'shipped'),
    defaultValue: 'processing'
  }
})

module.exports = Order

