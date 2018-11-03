const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

const updateCart = async (user, next, session) => {
  session.cart = []
  session.quantity = []
}

const getCartIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (+id === +cart[i].id) return i
  }
  return -1
}

router.get('/', async (req, res, next) => {
  if (!req.session.cart) {
    await updateCart(req.user, next, req.session)
  }
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})

router.delete('/remove/:id', (req, res) => {
  const idx = getCartIndex(req.params.id, req.session.cart)
  req.session.cart.splice(idx, 1)
  req.session.quantity.splice(idx, 1)
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})

router.get('/add/:id', async (req, res, next) => {
  try {
    if (!req.session.cart) await updateCart(req.user, next, req.session)
    const cartIdx = getCartIndex(req.params.id, req.session.cart)
    if (cartIdx >= 0) {
      req.session.quantity[cartIdx]++
    } else {
      const product = await Product.findById(req.params.id)
      req.session.cart.push(product)
      req.session.quantity.push(1)
    }
    res.json({cart: req.session.cart, quantity: req.session.quantity})
  } catch (err) {
    next(err)
  }
})

router.put('/update', (req, res) => {
  req.session.cart = req.body.cart
  req.session.quantity = req.body.quantity
  res.json({cart: req.session.cart, quantity: req.session.quantity})
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
