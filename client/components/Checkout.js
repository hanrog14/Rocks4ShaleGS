import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

const STRIPE_PUBLISHABLE = 'pk_test_4CxUYON5SPh3lzAPzarC3fZI'
const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'our heroku app goes here'
    : 'http://localhost:3000/api/checkout'

const CURRENCY = 'USD';

const fromUsdToCent  = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description) => token =>
  axios
    // .post('/api/stripe', {
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUsdToCent(amount)
    })
    .then(data => successPayment(data))
    .catch(data => errorPayment(data))

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
  name ={name}
  description={description}
  amount={fromUsdToCent(amount)}
  token={onToken(amount, description)}
  currency={CURRENCY}
  stripeKey={STRIPE_PUBLISHABLE}
  />
)

export default Checkout
