import React from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../../store/order'
import {Link} from 'react-router-dom'

class AdminOrdersView extends React.Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const filtered = this.props.prevOrders.filter(
      eachOrder => eachOrder.shippingStatus === 'processing'
    )
    const filteredClosed = this.props.prevOrders.filter(
        eachOrder => eachOrder.shippingStatus === 'shipped'
      )
    return (
      <div className="order-history">
        <h3>List of Open Orders to be Shipped</h3>
        <ul>
          {filtered.map(eachOrder => {
            return (
              <ol key={eachOrder.id}>
                  OrderID: #<Link to={`/orders/${eachOrder.id}`}>
                {eachOrder.id}
                </Link>
                {" "}
                Status: {eachOrder.shippingStatus}
              </ol>
            )
          })}
        </ul>
        <br/>
        <h3>List of Past Shipped Orders</h3>
        {filteredClosed.map(eachOrder => {
            return (
              <li key={eachOrder.id}>
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
