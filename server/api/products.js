const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const products = await Product.findAll()
    res.status(200).json(products)
  }
  catch(err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const specProduct = await Product.findById(req.params.id);
    res.json(specProduct);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try{
      const product = await Product.create(req.body);
      res.json(product)
  }
  catch(err) {
      next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const [numUpdated, updated] = await Product.update(req.body, {
      where: {
          id: req.params.id
      },
      returning: true
    })
    res.json(updated[0]);
  }
  catch(err) {
      next(err)
  }
})
