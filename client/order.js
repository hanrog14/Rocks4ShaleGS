const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const specProduct = await Order.findById(req.params.id);
    res.json(specProduct);
  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
    try {
        const products = await Order.findAll()
        res.status(200).json(products)
    }
    catch(err) {
        next(err)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
      const deletedProduct = await Order.findById(req.params.id);
        res.json(deletedProduct);
    } catch (error) { next(error) }
  });
