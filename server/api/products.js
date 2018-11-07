const router = require('express').Router()
const {Product, Review} = require('../db/models')
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
    const specProduct = await Product.findById(req.params.id, {include: [{model: Review}]});
    res.json(specProduct);
  } catch (error) {
    next(error)
  }
});

const isAdminMW = (req, res, next) => (req.user && req.user.adminStatus) ? next() : res.alert('Forbidden')

router.post('/', isAdminMW, async (req, res, next) => {
  try{
      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        category: req.body.category,
        pictureUrl: req.body.pictureUrl
      });
      res.json(product)
  }
  catch(err) {
    next(err)
  }
})

router.post('/:id/review', async (req, res, next) => {
  try{
    const product = await Product.findById(req.params.id);
    const review = await Review.create(req.body);
    await review.setProduct(product);
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

