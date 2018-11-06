import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../../store/order'
import { Link } from 'react-router-dom'

class OrderHistory extends React.Component {

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id)
  }

  render() {
    let subtotal = 0;
    return (
      this.props.orderProducts ?
      <div>
        <h2>ORDER INFO</h2>
          <br/>
            Status: {this.props.orderProducts.order.shippingStatus}
          <br/>
            Order Placed: {this.props.orderProducts.order.createdAt}
          <br/>
            Products:
            <ol>
          {this.props.orderProducts.products.map(product => {
            subtotal += (product.quantity * product.price)
            return (
              <li key={product.productId}>
                <h4>
                  <Link to={`/products/${product.productId}`}>
                    <h2>{product.name}</h2>
                  </Link>
                Quantity: {product.quantity}
                  <br/>
                Price: ${Number.parseFloat(product.price/100).toFixed(2)}
                </h4>
              </li>
            )})}
          </ol>
          Subtotal: ${Number.parseFloat(subtotal/100).toFixed(2)}
      </div> :
      <h1>Loading..</h1>
    )
  }
}

const mapStatetoProps = state => ({
  orderProducts: state.order.curOrderProducts
})

const mapDispatchToProps = dispatch => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(OrderHistory)
