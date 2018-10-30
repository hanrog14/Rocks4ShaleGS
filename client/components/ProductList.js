import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'

class ProductList extends React.Component {
//   constructor() {
//     super()
//   }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <h2>ALL PRODUCTS</h2>
            {this.state.products.map(eachProduct => (
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
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchProducts())
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
