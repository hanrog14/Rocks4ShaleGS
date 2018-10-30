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
        <table>
          <tbody>
            {this.props.products.map(eachProduct => (
              <tr key={eachProduct.name}>
                <td>
                  Name: {eachProduct.name}
                  <br />
                  Description: {eachProduct.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
