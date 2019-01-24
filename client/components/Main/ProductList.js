import React from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/product'
import { addItemToOrder } from '../../store/order'
import { NotFoundComponent } from './NotFoundComponent'
import { Link } from 'react-router-dom'
import Notifications, {notify} from 'react-notify-toast';
import EachProduct from './EachProduct';

const possibleCategories = ['Miscellaneous', 'Sedimentary', 'Igneous', 'Metamorphic', 'all']

class ProductList extends React.Component {
  constructor() {
    super()
    this.clickFunc = this.clickFunc.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllProducts()
  }

  clickFunc(productId, productName) {
    this.props.addToCart(productId); notify.show(`${productName} was added to cart!`, 'custom', 1000, {background: '#00994d', text: "#FFFFFF"})
  }

  //eslint-disable-next-line
  render() {
    const category = this.props.match.params.category
    const name = this.props.match.params.name
    let products = this.props.products

    if (name) {
      products = this.props.products.filter(prod => prod.name.toLowerCase() === name.toLowerCase())
    } else if (category !== 'all') {
      products = this.props.products.filter(prod => prod.category === category)
    }
    return (possibleCategories.includes(category) || name) && products.length ? (
      <div className="all-product-outer-wrapper">
      <Notifications />
      {category && <h3>{`${category.toUpperCase()} PRODUCTS`}</h3>}
      <div className="all-product-container">
          {this.props.isAdmin &&
            <div>
              <Link to="../../products/create">
                <button type="submit" className="create-new-product">Create New Product</button>
              </Link>
              <Link to="/tasks">
                <button type="submit" className="admin-orders-view">Admin Orders View</button>
              </Link>
            </div>
          }

          <div className="row">
            <br />
            {products.map(eachProduct => (
              <EachProduct key={eachProduct.id} product={eachProduct} clickFunc={this.clickFunc} isAdmin={this.props.isAdmin}/>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <NotFoundComponent />
    )
  }
}

const mapStatetoProps = state => ({
  products: state.product.products,
  isAdmin: state.user.adminStatus
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchProducts()),
  addToCart: id => dispatch(addItemToOrder(id))
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
