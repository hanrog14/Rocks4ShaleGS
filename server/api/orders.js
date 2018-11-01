const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

router.get('/add/:id', async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const product = await Product.findById(req.params.id);
  req.session.cart.push(product)
  res.json(req.session.cart)
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
