const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', (req, res) => {
  if (!req.session.cart) {
    req.session.cart = []
  }
  res.json(req.session.cart)
})

router.delete('/remove/:id', (req, res) => {
  req.session.cart = req.session.cart.filter(eachItem => {
    return +eachItem.id !== +req.params.id
  })
  res.json(req.session.cart)
})

router.get('/add/:id', async (req, res, next) => {
  try {
    // find a new instance of the product
    const product = await Product.findById(req.params.id)
    // locate if the item is already in the cart array and grab it
    const target = req.session.cart.filter(
      eachItem => eachItem.id === product.id
    )[0]

    // if there is not cart, add a cart to the session
    if (!req.session.cart) {
      req.session.cart = []
      // else if there is a target and a cart, increment the target quantity
    } else if (target && req.session.cart) {
      target.quantity++
      // create a "NEW" session
      const newSession = req.session.cart.filter(
        eachItem => eachItem.id !== product.id
      )
      newSession.push(target)
      res.json(newSession)
    } else {
      product.dataValues.quantity = 1
      const singleNewSession = req.session.cart.push(product)
      res.json(singleNewSession)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const [order, created] = await Order.findOrCreate({
      where: {
        isCart: true,
        userId: req.user.id
      },
      include: [{model: Product}]
    })
    const product = await Product.findById(req.body.id)
    await OrderProduct.create({productId: product.id, orderId: order.id})
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})
