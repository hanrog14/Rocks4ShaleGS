import React from 'react'
import {connect} from 'react-redux'
import {removeItemToOrder, getWholeCart} from '../store/order'
import {Link} from 'react-router-dom'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getWholeCart()
  }

  render() {
    let productCartArray = Array.from(this.props.products)
    const quantityRange = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((item, index) => (
          <option value={start + index}>{start + index}</option>
        ))
    }
    let arrayRender = productCartArray.map(item => {
      return (
        <div className="no-break" key={item.id}>
          <li>
            {'NAME: ' + item.name}: {'PRICE: ' + item.price}: QUANTITY:
            <select>{quantityRange(1, item.quantity).reverse()}</select>
            <button
              type="button"
              onClick={() => this.props.removeItemToOrder(item.id)}
            >
              x
            </button>
          </li>
          <br />
        </div>
      )
    })

    return (
      <div>
        <h1>Cart:</h1>
        <ul>{arrayRender}</ul>
        <Link to="/checkout"><button type="button">Checkout</button></Link>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.order.cart
})

const mapDispatchToProps = dispatch => ({
  removeItemToOrder: id => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart())
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
