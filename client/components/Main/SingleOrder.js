import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../../store/order'

class OrderHistory extends React.Component {

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id)
  }

  render() {
    return (
      this.props.orderProducts ?
      <div>
        <h2>ORDER INFO</h2>
          <br/>
          {this.props.orderProducts.map(product => (
            <div key={product.productId}>
              <h4>Name: {product.name} Quantity: {product.quantity} Price: ${product.price}</h4>
            </div>
          ))}
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
