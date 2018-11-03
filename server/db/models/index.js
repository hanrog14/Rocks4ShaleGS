const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const Review = require('./review')
const db = require('../db')
const Sequelize = require('sequelize')

const OrderProduct = db.define('orderProduct', {
  quantity: Sequelize.STRING,
  price: Sequelize.STRING,
  name: Sequelize.STRING
})

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})

module.exports = {
  User,
  Product,
  Order,
  OrderProduct,
  Review
}
