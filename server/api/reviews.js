const router = require('express').Router()
const {Review, Product} = require('../db/models')
module.exports = router

router.post('/:id', async (req, res, next) => {
  try{
    const product = await Product.findById(req.params.id);
    const review = await Review.create(req.body);
    await review.setProduct(product);
    res.json(review)
  }
  catch(err) {
    next(err)
  }
})
