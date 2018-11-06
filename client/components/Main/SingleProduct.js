import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../../store/product'
import {addItemToOrder} from '../../store/order'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    return (
      <div className="single-product-page">
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
                onClick={() => this.props.addToCart(this.props.product.id)}
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
