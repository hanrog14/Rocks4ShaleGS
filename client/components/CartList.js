import React from 'react'
import {connect} from 'react-redux'

class CartList extends React.Component {

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
          <ul>
            {arrayRender}
          </ul>
        </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.product.products
})

<<<<<<< Updated upstream
export default connect(mapStatetoProps)(CartList)


=======
const mapDispatchToProps = dispatch => ({
  removeItemToOrder: id => dispatch(removeItemToOrder(id)),
  getWholeCart: () => dispatch(getWholeCart())
})
>>>>>>> Stashed changes

