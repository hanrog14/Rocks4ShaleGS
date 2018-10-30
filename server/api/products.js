const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const specProduct = await Product.findById(req.params.id);
    if (specProduct) {
      res.json(specProduct);
    } else {
      res.sendStatus(404);
    }
  } catch (error) { next(error) }
});

router.get('/', async (req, res, next) => {
    try{
        const products = await Product.findAll()
        res.status(200).json(products)
    }
    catch(err) {
        next(err)
    }
})
