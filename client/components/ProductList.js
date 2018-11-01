import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
import {addItemToOrder} from '../store/order'
import {addToCart} from '../store/user'
import {NotFoundComponent} from './NotFoundComponent'
import {Link} from 'react-router-dom'

const possibleCategories = ["Miscellaneous", "Sedimentary", "Igneous", "Metamorphic", "all"];

class ProductList extends React.Component {

  constructor(props){
    super(props)

    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllProducts()
    //this.props.addItemToOrder(1)
  }

  clickHandler(event){
    event.preventDefault()
    //console.log("click")
    this.props.addToCart(event.target.value)

  }

  render() {
    const category = this.props.match.params.category;
    let products = this.props.products;
    if (category !== 'all') {
      products = this.props.products.filter(prod => prod.category === category);
    }
    return (
      possibleCategories.includes(category) ?
        <div>
          <h2>{`${category.toUpperCase()} PRODUCTS`}</h2>
          <div className="all-product-container">
            {this.props.isAdmin && <Link to="../../products/create">Create new Product</Link>}
            <div className="row">
              <br/>
              {products.map(eachProduct => (
                <div className="column" key={eachProduct.name}>
                  <Link to={`../../products/${eachProduct.id}`}><img className="column-image" src={eachProduct.pictureUrl} /></Link>
                  <br />
                  Name: <Link to={`../../products/${eachProduct.id}`}>{eachProduct.name}</Link>
                  <br />
                  Price: ${eachProduct.price}
                  <br/>
                  <button type="button" onClick={() => this.props.addToCart(eachProduct.id)}>Add To Cart</button>
                  <br />
                  {this.props.isAdmin && <Link to={`../../products/${eachProduct.id}/update`}>Edit</Link>}
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div> :
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
  //addToCart: (product) => dispatch(addProduct())
  addToCart: (id) => dispatch(addToCart(id))
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
