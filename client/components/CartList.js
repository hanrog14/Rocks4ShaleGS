import React from 'react'
import {connect} from 'react-redux'

class CartList extends React.Component {

  render() {
    let productCartArray = this.props.products
    let arrayRender = productCartArray.map(item => { return <li key={item.id} >{item.name}: {item.price}</li>})

    return (
        <div>
          <h1>Cart:</h1>
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

export default connect(mapStatetoProps)(CartList)



