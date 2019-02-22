const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_KEY)
module.exports = router

// return order history for all users
router.get('/history', async (req, res, next) => {
  try {
    const orders = await Order.findAll({where: {isCart: false}})
    res.json(orders)
  }
  catch(err) {
    next(err)
  }
})

// get order by id
router.get('/:id', async (req, res, next) => {
  try {
    const products = await OrderProduct.findAll({where: {orderId: req.params.id}})
    const order = await Order.findById(req.params.id)
    if (req.user && ((order.userId === req.user.id) || req.user.adminStatus)) {
      res.json({products, order})
    } else {
      res.json({products: [], order: []})
    }
  } catch (err) {
    next(err)
  }
})

// get order placed by a user
router.get('/history/:id', async (req, res, next) => {
  try {
    if (req.user && (+req.params.id === +req.user.id)) {
      const orders = await Order.findAll({where: {userId: req.params.id}})
      res.json(orders)
    } else {
      res.send([])
    }
  } catch (err) {
    next(err)
  }
})

// create an order after user checks out and decrease product inventory - process stripe charges
router.post('/create', async (req, res, next) => {
  try {
    let userId = (req.user) ? req.user.id : null
    const order = await Order.create({isCart: false, userId: userId});
    let sum = 0;
    await Promise.all(
      req.session.cart.map((prod, i) => {
        Product.update(
          {inventory: prod.inventory - req.session.quantity[i]},
          {where: { id: prod.id }}
        )
        OrderProduct.create({
          productId: prod.id,
          orderId: order.id,
          quantity: req.session.quantity[i],
          price: prod.price,
          name: prod.name
        })
        sum = +(req.session.quantity[i] * prod.price)
      })
    )
    const token = req.body.id;

    stripe.charges.create({amount: sum, currency: 'usd', description: 'Items purchased', source: token})

    req.session.cart = [];
    req.session.quantity = [];
    res.json({cart: req.session.cart, quantity: req.session.quantity})
  } catch (err) {next(err)}
})
