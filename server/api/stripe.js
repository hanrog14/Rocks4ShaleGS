//import secret from '../../secrets'
const router = require('express')()

const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY

const stripe = require('stripe')(keySecret)

router.set("view engine", "pug")
router.use(require("body-parser").urlencoded({extended: false}));

const {Order} = require('../db/models/')
module.exports = router

router.get('/', (req, res) => {
  res.render('index.pug', {keyPublishable})
})

router.post('/stripe', (req, res) => {
  let amount = 40;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));

})

// const stripeChar = (res, req) =>{
//   switch(err.type){
//     case 'StripeCardError':

//     err.message;
//   }
// }