const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

const updateCart = async (user, next, session) => {
  // if (user) {
  //   const [order, created] = await Order.findOrCreate({
  //     where: {
  //       isCart: true,
  //       userId: user.id
  //     }
  //   })
  //   session.order = order.toJSON()
  //   session.cart = session.order.products
  //   session.quantity = session.order.products.map(async product => {
  //     const joinTable = await Order.findOne({
  //       where: {
  //         productId: product.id,
  //         orderId: order.id
  //       }
  //     })
  //     return joinTable.quantity
  //   })
  // } else {
  //   session.cart = []
  //   session.quantity = []
  // }
  session.cart = []
  session.quantity = []
}

const getCartIndex = (id, cart) => {
  for (let i = 0; i < cart.length; i++) {
    if (+id === +cart[i].id) return i
  }
  return -1
}

router.post('/create', async (req, res, next) => {
  try {
    let userId = (req.user) ? req.user.id : null
    const order = await Order.create({isCart: false, userId: userId});
    await Promise.all(
      req.session.cart.map((prod, i) => {
        OrderProduct.create({productId: prod.id, orderId: order.id, quantity: req.session.quantity[i], price: prod.price, name: prod.name})
      })
    )
    req.session.cart = null
    req.session.quantity = null
    res.json({cart: req.session.cart, quantity: req.session.quantity})
  } catch (err) {next(err)}
})

// router.delete('/clear', (req, res) => {
//   req.session.cart = null
//   req.session.quantity = null
//   res.json({cart: req.session.cart, quantity: req.session.quantity})
// })

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
    if (!req.session.cart) {
      await updateCart(req.user, next, req.session)
    }
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

router.get('/:id', async (req, res, next) => {
  try {
    const products = await OrderProduct.findAll({
      where: {orderId: req.params.id}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/update', (req, res) => {
  req.session.cart = req.body.cart
  req.session.quantity = req.body.quantity
  res.json({cart: req.session.cart, quantity: req.session.quantity})
})
