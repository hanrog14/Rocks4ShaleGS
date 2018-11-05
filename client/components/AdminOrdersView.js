import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../store/order'
import {Link} from 'react-router-dom'

class AdminOrdersView extends React.Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    console.log('this is the pre', this.props.prevOrders)
    const filtered = this.props.prevOrders.filter(
      eachOrder => eachOrder.shippingStatus === 'processing'
    )
    const filteredClosed = this.props.prevOrders.filter(
        eachOrder => eachOrder.shippingStatus === 'shipped'
      )
    return (
      <div>
        <h2>List of Open Orders to be Shipped</h2>
        <ul>
          {filtered.map(eachOrder => {
            return (
              <li key={eachOrder.id}>
                  OrderID: #<Link to={`/orders/${eachOrder.id}`}>
                {eachOrder.id}
                </Link>
                {" "}
                Status: {eachOrder.shippingStatus}
              </li>
            )
          })}
        </ul>

        <h2>List of Shipped Orders</h2>
        {filteredClosed.map(eachOrder => {
            return (
              <li>
                OrderID: {eachOrder.id}
                status: {eachOrder.shippingStatus}
              </li>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  prevOrders: state.order.prevOrders
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchAllOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrdersView)
