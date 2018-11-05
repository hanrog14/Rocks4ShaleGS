import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux'
import {submitOrder} from '../../store/order'

class Billing extends Component {

  onToken = (token) => {
    this.props.submitChange(token)

  }

  render() {
      return (
      <StripeCheckout
        token={this.onToken}
        billingAddress={true}
        shippingAddress={true}
        stripeKey="pk_test_4CxUYON5SPh3lzAPzarC3fZI"
      />
      )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    submitChange: (shippingObj) => dispatch(submitOrder(shippingObj))
  }
}
export default connect(null, mapDispatchToProps)(Billing)
