import CreateUpdateForm from './CreateUpdateForm'
import {connect} from 'react-redux'
import {getNewProduct} from '../../store/product'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitChange: (product) => dispatch(getNewProduct(product, ownProps.history))
  }
}

export default connect(null, mapDispatchToProps)(CreateUpdateForm)
