import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../../store/product'
import {addItemToOrder} from '../../store/order'
import {Link} from 'react-router-dom'
import {NotFoundComponent} from './NotFoundComponent'
import Notifications, {notify} from 'react-notify-toast';

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      invalidInput: false
    }
  }

  componentDidMount() {
    if( !isNaN(Number(this.props.match.params.id)) ){
      this.props.getProduct(this.props.match.params.id)
    } else {
      this.setState({invalidInput: true})
    }
  }

  render() {
    return (
      <div className="single-product-page">
      <Notifications />
      { this.props.product && !this.state.invalidInput ?
        <div>
          <Link to='/products/category/all'>Back To Shop</Link>
            {this.props.product.id ? (
              <div className="">
                <div className="single-product-container">
                <div className='single-product-image'>
                  <img
                    className="single-image"
                    src={this.props.product.pictureUrl}
                  />
                  </div>
                  <div className="single-product-text">
                  <h3>{this.props.product.name}</h3>
                  <p>{this.props.product.description}</p>
                  <p>Price: ${Number.parseFloat(this.props.product.price/100).toFixed(2)}</p>
                  <button
                    type="button"
                    className="add-to-cart"
                    onClick={() => {this.props.addToCart(this.props.product.id);notify.show(`${this.props.product.name} was added to cart!`, 'custom', 1000, {background: '#00994d', text: "#FFFFFF"})}}
                  >
                    Add To Cart
                  </button>
                  </div>
                </div>
                <br />
                <div className="review-header">Customer Reviews</div>
                <div className="add-review">
                  <Link to={`${this.props.product.id}/review`}>Add A Review</Link>
                </div>
                {this.props.product.reviews.map(review => (
                  <div className="reviews" key={review.id}>
                    Stars: {review.stars} <br />Comments: {review.comments}
                    <br />
                  </div>
                ))}
              </div>
            ) : (
              <h3>Loading...</h3>
            )}
        </div>
        : <NotFoundComponent />
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    product: state.product.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: productId => dispatch(getSelectedProduct(productId)),
    addToCart: id => dispatch(addItemToOrder(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

/**
 * PROP TYPES
 */
SingleProduct.propTypes = {
  product: PropTypes.object
}
