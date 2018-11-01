import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product'
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
          <h1>THIS IS WORKING</h1>
          <h2>{`${category.toUpperCase()} PRODUCTS`}</h2>
          <div className="all-product-container">
            <div className="row">

              <br/>
              {products.map(eachProduct => (
                <div className="column" key={eachProduct.name}>
                  <img className="column-image" src={eachProduct.pictureUrl} />
                  <br />
                  Name: <Link to={`../../products/${eachProduct.id}`}>{eachProduct.name}</Link>
                  <br />
                  Price: ${eachProduct.price}
                  <br/>
                  <button type= "button" onClick= {this.clickHandler}>Add to Cart</button>
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
  products: state.product.products
})

const mapDispatchToProps = dispatch => ({
  fetchAllProducts: () => dispatch(fetchProducts()),
  addToCart: (product) => dispatch(addProduct())
})

export default connect(mapStatetoProps, mapDispatchToProps)(ProductList)
