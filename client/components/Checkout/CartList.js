import React from 'react'
import {connect} from 'react-redux'
import {
  removeItemToOrder,
  getWholeCart,
  updateItem
} from '../../store/order'
import {Link} from 'react-router-dom'
import Billing from './Shipping'

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

    let arrayRender = productCartArray.map((item, i) => {
      cartTotal += item.price * this.props.quantity[i]
      return (
        <tr key={item.id}>
          <td className="item-info">
            <img src={item.pictureUrl} />
            <div className="item-content">
              <h4>Rocks For Shale</h4>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <button type="button" onClick={() => this.props.removeItemToOrder(item.id)}>Remove Item</button>
            </div>
          </td>
          <td>
            ${Number.parseFloat(item.price/100).toFixed(2)}
          </td>
          <td>
            <select
              defaultValue={ Math.min(this.props.quantity[i], item.inventory) }
              onChange={event => this.handleChange(event, i)}
            >
              {new Array(item.inventory > 10 ? 10 : item.inventory).fill().map((elem, idx) => {
                return (
                  <option key={idx} value={1 + idx}>
                    {1 + idx}
                  </option>
                )
              })}
            </select>
          </td>
          <td>
            ${Number.parseFloat((item.price*this.props.quantity[i])/100).toFixed(2)}
          </td>
        </tr>
      )
    })
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
              {arrayRender}
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
  removeItemToOrder: id => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart()),
  updateItem: (cart, products) => dispatch(updateItem(cart, products))
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
