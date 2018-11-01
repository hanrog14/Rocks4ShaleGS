import CreateUpdateForm from './CreateUpdateForm'
import {connect} from 'react-redux'
import {updateProduct} from '../store/product'

const mapStateToProps = (state) => {
  return {
    selectedItem: state.product.selectedProduct
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitChange: (product, id) => dispatch(updateProduct(product, id, ownProps.history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateForm)
