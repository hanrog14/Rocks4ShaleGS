import React from 'react'
import {connect} from 'react-redux'
import {
  removeItemToOrder,
  getWholeCart,
  addItemToOrder,
  updateItem
} from '../store/order'
import {Link} from 'react-router-dom'

class CartList extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getWholeCart()
  }

  handleChange(event, i) {
    event.preventDefault()
    this.props.products[i].quantity = parseInt(event.target.value, 10)
    this.props.updateItem(this.props.products, this.props.quantity)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getWholeCart()
  }

  render() {
    let productCartArray = this.props.products
    let arrayRender = productCartArray.map((item, i) => {
      return (
        <div className="no-break" key={item.id}>
          <form id="update-quantity" onSubmit={this.handleSubmit}>
            {'NAME: ' + item.name}: {'PRICE: ' + item.price}: QUANTITY:
            <select
              defaultValue={this.props.products[i].quantity}
              onChange={event => this.handleChange(event, i)}
            >
              {new Array(item.inventory).fill().map((elem, idx) => {
                return (
                  <option key={idx} value={1 + idx}>
                    {1 + idx}
                  </option>
                )
              })}
            </select>
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={() => this.props.removeItemToOrder(item.id)}
            >
              x
            </button>
          </form>
          <br />
        </div>
      )
    })

    return (
      <div>
        <h1>Cart:</h1>
        <ul>{arrayRender}</ul>
        <Link to="/checkout">
          <button type="button">Checkout</button>
        </Link>
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
  addItemToOrder: () => dispatch(addItemToOrder()),
  updateItem: (cart, products) => dispatch(updateItem(cart, products))
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
