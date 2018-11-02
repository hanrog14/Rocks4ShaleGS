import React from 'react'
import {connect} from 'react-redux'
import {removeItemToOrder, getWholeCart, addItemToOrder} from '../store/order'
import {Link} from 'react-router-dom'

class CartList extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getWholeCart()
  }

  handleChange(event) {
    event.preventDefault();

    const newItem = this.props.products.filter(eachItem => +eachItem.id === +event.target.name)[0]

    newItem.quantity = +event.target.value

    const newCart = this.props.products.filter(eachItem => +eachItem.id !== +event.target.name)

    newCart.push(newItem)

    this.setState(newCart);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getWholeCart()
  }

  render() {
    let productCartArray = Array.from(this.props.products)
    const quantityRange = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((item, index) => (
          <option
          key={index}
          value={start + index}
          onChange={this.handleChange}
          >
          {start + index}
          </option>
        ))
    }
    let arrayRender = productCartArray.map(item => {
      return (
        <div className="no-break" key={item.id}>
          <form id="update-quantity" onSubmit={this.handleSubmit}>
            {'NAME: ' + item.name}: {'PRICE: ' + item.price}: QUANTITY:
            <select name={item.id} onChange={this.handleChange}>{quantityRange(1, item.quantity).reverse()}</select>
            <button type="submit">
              Update
            </button>
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
        <Link to="/checkout"><button type="submit">Checkout</button></Link>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.order.cart
})

const mapDispatchToProps = dispatch => ({
  removeItemToOrder: id => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart()),
  addItemToOrder: () => dispatch(addItemToOrder())
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
