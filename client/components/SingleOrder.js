import React from 'react'
import {connect} from 'react-redux'
import {fetchOrder} from '../store/order'

class OrderHistory extends React.Component {

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.id)
  }

  render() {
    return (
      this.props.order ?
      <div>
        <h2>ORDER INFO</h2>
          <br/>
          {this.props.order.products.map(product => (
            <div key={product.id}>
              <h4>{product.name}</h4>
              <br />
            </div>
          ))}
      </div> :
      <h1>Loading..</h1>
    )
  }
}

const mapStatetoProps = state => ({
  order: state.order.selectedOrder
})

const mapDispatchToProps = dispatch => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
})

export default connect(mapStatetoProps, mapDispatchToProps)(OrderHistory)
