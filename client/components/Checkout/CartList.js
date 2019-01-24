import React from 'react'
import {connect} from 'react-redux'
import {
  removeItemToOrder,
  getWholeCart,
  updateItem
} from '../../store/order'
import Billing from './Shipping'
import CartRow from './CartRow'

class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getWholeCart()
  }

  handleChange(event, i) {
    event.preventDefault()
    this.props.quantity[i] = parseInt(event.target.value, 10)
    this.props.updateItem(this.props.products, this.props.quantity)
  }

  render() {
    let productCartArray = this.props.products
    let cartTotal = 0;
    return (
      <div>
      { this.props.products.length ?
        <div id="cart">
          <h3>My Bag</h3>
          <table id="cart-table">
            <tbody>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
              {productCartArray.map((item, i) => {
                cartTotal += item.price * this.props.quantity[i];
                return <CartRow
                  key={item.id} item={item}
                  removeItemFromOrder={this.props.removeItemFromOrder}
                  quantity={this.props.quantity[i]}
                  i={i}
                  handleChange={this.handleChange}
                />
              })}
            </tbody>
          </table>
          <h3>Subtotal: ${Number.parseFloat(cartTotal/100).toFixed(2)}</h3>
          <Billing />
        </div> :
        <h1>No current items in bag</h1>
      }
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.order.cart,
  quantity: state.order.quantity
})

const mapDispatchToProps = dispatch => ({
  removeItemFromOrder: id => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart()),
  updateItem: (cart, products) => dispatch(updateItem(cart, products))
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
