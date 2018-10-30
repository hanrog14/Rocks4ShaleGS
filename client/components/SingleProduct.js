import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSelectedProduct} from '../store/product'

/**
 * COMPONENT
 */
class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        {
        this.props.product.id ?

          <div>
            <h3>{this.props.product.name}</h3>
            <p>{this.props.product.description}</p>
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
