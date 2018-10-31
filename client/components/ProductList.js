import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

class ProductList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    return (
      <div>
    <h2>ALL PRODUCTS</h2>
      <div className="all-product-container">
      <div className="row">

        <br/>
        {this.props.products.map(eachProduct => (
          <div className="column" key={eachProduct.name}>
            <img className="column-image" src={eachProduct.pictureUrl} />
            <br />
            Name: {eachProduct.name}
            <br />
            Price: ${eachProduct.price}
            <br/>
          </div>
        ))}
      </div>
      </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchProducts())
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
