const router = require('express').Router()
const {Order, Product, OrderProduct} = require('../db/models')
module.exports = router

// router.get('/:id', async (req, res, next) => {
//   try {
//     const specProduct = await Order.findById(req.params.id);
//     res.json(specProduct);
//   } catch (error) { next(error) }
// });

router.put('/', async (req, res, next) => {
    try {
        console.log('')
        const [order, created] = await Order.findOrCreate({where: {isCart: true}, include: [{model: Product}]})
        const product = await Product.findById(req.body.id);
        console.log('this is the order', order)
        console.log('this is created', created)
        // console.log('this is the product', product)
        await OrderProduct.create({productId: product.id, orderId: order.id})
        res.status(200).json(order)
    }
    catch(err) {
        next(err)
    }
})
