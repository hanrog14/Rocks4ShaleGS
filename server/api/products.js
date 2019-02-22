const router = require('express').Router()
const {Product, Review} = require('../db/models')
module.exports = router

// middleware to determine if a user is admin
const isAdminMW = (req, res, next) => (req.user && req.user.adminStatus) ? next() : res.alert('Forbidden')

// get all products
router.get('/', async (req, res, next) => {
  try{
    const products = await Product.findAll()
    res.json(products)
  }
  catch(err) {
    next(err)
  }
})

// get product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {include: [{model: Review}]});
    res.json(product);
  } catch (error) {
    next(error)
  }
});

// create a product if user is admin
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

// add a review to a product
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

// update an item based on id
router.put('/:id', async (req, res, next) => {
  try{
    const [,updated] = await Product.update(req.body, {
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

