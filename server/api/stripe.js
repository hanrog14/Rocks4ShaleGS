const router = require('express').Router()
const stripe = require('stripe')(process.env.SECRET_KEY)
const {Order} = require('../db/models')
module.exports = router

const postStripeCharge = (res, req) => async (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({
      error: stripeErr
    })
  } else {
    res.status(200).send({
      success: stripeRes
    })
    const previousCart = await Order.findById(req.body.id)
    await previousCart.update({
      isCart: false,
      status: 'paid',
      total: req.body.amountTotal
    })

    //inventory deduction goes here?
  }
}

router.post('/checkout', (req, res, next) => {
  try {
    stripe.charges.create(req.body, postStripeCharge(res, req))
  } catch (err) {
    next(err)
  }
})

//offical doc code
// //import secret from '../../secrets'
// const router = require('express')()

// const keyPublishable = process.env.PUBLISHABLE_KEY
// const keySecret = process.env.SECRET_KEY

// const stripe = require('stripe')(keySecret)

// router.set("view engine", "pug")
// router.use(require("body-parser").urlencoded({extended: false}));

// const {Order} = require('../db/models/')
// module.exports = router

// router.get('/', (req, res) => {
//   res.render('index.pug', {keyPublishable})
// })

// router.post('/stripe', (req, res) => {
//   let amount = 40;

//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//   .then(customer =>
//     stripe.charges.create({
//       amount,
//       description: "Sample Charge",
//          currency: "usd",
//          customer: customer.id
//     }))
//   .then(charge => res.render("charge.pug"));

// })