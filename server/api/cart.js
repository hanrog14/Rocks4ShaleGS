const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const updateCart = (session) => {
  session.cart = []
  session.quantity = []
}

const getCartIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (+id === +cart[i].id) return i
  }
  return -1
}

// return cart contents on current session
router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    updateCart(req.session)
  }
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})

// add item to cart
router.post('/add', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      updateCart(req.session)
    }
    const cartIdx = getCartIndex(req.body.id, req.session.cart)
    const product = await Product.findById(req.body.id)
    if ((cartIdx >= 0) && (req.session.quantity[cartIdx] < product.inventory)) {
      req.session.quantity[cartIdx]++
    } else if (cartIdx < 0) {
      req.session.cart.push(product)
      req.session.quantity.push(1)
    }
    res.json({cart: req.session.cart, quantity: req.session.quantity})
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

// remove item from cart
router.delete('/remove/:id', (req, res) => {
  const idx = getCartIndex(req.params.id, req.session.cart)
  req.session.cart.splice(idx, 1)
  req.session.quantity.splice(idx, 1)
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})
