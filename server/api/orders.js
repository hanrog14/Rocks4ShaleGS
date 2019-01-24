const router = require('express').Router()
const {Order, Product, OrderProduct, User} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_KEY)
module.exports = router

const updateCart = (user, next, session) => {
  session.cart = []
  session.quantity = []
}

const getCartIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (+id === +cart[i].id) return i
  }
  return -1
}

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

// return cart contents on current session
router.get('/cart', async (req, res, next) => {
  try{
    if (!req.session.cart) {
      updateCart(req.user, next, req.session)
    }
    res.json({cart: req.session.cart, quantity: req.session.quantity})
  }
  catch(err) {
    next(err)
  }
})

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

// remove item from cart
router.delete('/remove/:id', (req, res) => {
  const idx = getCartIndex(req.params.id, req.session.cart)
  req.session.cart.splice(idx, 1)
  req.session.quantity.splice(idx, 1)
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})

// add item to cart
router.get('/add/:id', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      updateCart(req.user, next, req.session)
    }
    const cartIdx = getCartIndex(req.params.id, req.session.cart)
    const product = await Product.findById(req.params.id)
    if (cartIdx >= 0) {
      if (req.session.quantity[cartIdx] < product.inventory) {
        req.session.quantity[cartIdx]++
      }
    } else {
      req.session.cart.push(product)
      req.session.quantity.push(1)
    }
    res.json({cart: req.session.cart, quantity: req.session.quantity})
  } catch (err) {
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

// get order by user id
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

// update cart with values given
router.put('/update', (req, res) => {
  req.session.cart = req.body.cart
  req.session.quantity = req.body.quantity
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})
