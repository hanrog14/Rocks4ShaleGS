const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const db = require('../db')

const OrderProduct = db.define('orderProduct')

User.hasMany(Order)
Order.belongsTo(User)

Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})

module.exports = {
  User,
  Product,
  Order,
  OrderProduct
}
