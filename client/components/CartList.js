import React from 'react'
import {connect} from 'react-redux'
// import {fetchProducts} from '../store/product'
// import {NotFoundComponent} from './NotFoundComponent'

// Link may be needed for clicking to a specific item from the cart
// import {Link} from 'react-router-dom'

class CartList extends React.Component {

  // constructor(props){
  //   super(props)
  // }

  // componentDidMount() {
  //   this.props.fetchAllProducts()
  // }

  render() {
    let productCartArray = this.props.products
    let arrayRender = productCartArray.map(item => { return <li key={item.id} >{item.name}: {item.price}</li>})

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


// --- will need this for removing from cart or checkout

// const mapDispatchToProps = dispatch => ({
//   fetchAllProducts: () => dispatch(fetchProducts()),
//   addToCart: (product) => dispatch(addProduct())
// })

export default connect(mapStatetoProps)(CartList)



