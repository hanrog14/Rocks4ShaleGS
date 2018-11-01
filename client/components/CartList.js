import React from 'react'
import {connect} from 'react-redux'
import {removeItemToOrder, getWholeCart} from '../store/order'

class CartList extends React.Component {
  componentDidMount() {
    this.props.getWholeCart()
  }

  render() {
    let productCartArray = Array.from(this.props.products)
    let arrayRender = productCartArray.map(item => {
      return (
        <li key={item.id}>
          {'NAME: ' + item.name}: {'PRICE: ' + item.price}{' '}
          <button type="button" onClick={(()=> this.props.removeItemToOrder(item.id))}>x</button>
        </li>
      )
    })

    return (
      <div>
        <h1>Cart:</h1>
        <ul>{arrayRender}</ul>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.order.cart
})

const mapDispatchToProps = dispatch => ({
  removeItemToOrder: (id) => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart())
})

export default connect(mapStatetoProps, mapDispatchToProps)(CartList)
