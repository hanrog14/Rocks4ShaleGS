import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../../store/product'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    return (
      <div className="all-product-container">
        {
        this.props.product.id ?
          <div>
            <Link to={`${this.props.product.id}/review`}>Add A Review</Link>
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.description}</p>
            <img className="column-image" src={this.props.product.pictureUrl} />
            {this.props.product.reviews.map(review => <p key={review.id}>{review.stars} {review.comments}</p>)}
          </div> :

          <h3>Loading...</h3>
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
    getProduct: (productId) => dispatch(getSelectedProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

/**
 * PROP TYPES
 */
SingleProduct.propTypes = {
  product: PropTypes.object
}
