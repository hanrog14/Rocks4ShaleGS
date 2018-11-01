const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  res.json(req.session.cart)
})

router.delete('/remove/:id', (req, res, next) => {
  req.session.cart = req.session.cart.filter(eachItem => {
    return +eachItem.id !== +req.params.id
  })
  res.json(req.session.cart)
})

router.get('/add/:id', async (req, res, next) => {
  try {
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const product = await Product.findById(req.params.id);
    req.session.cart.push(product)
    res.json(req.session.cart)
  }
  catch(err) {
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
        const product = await Product.findById(req.body.id);
        await OrderProduct.create({productId: product.id, orderId: order.id})
        res.status(200).json(order)
    }
    catch(err) {
        next(err)
    }
})
