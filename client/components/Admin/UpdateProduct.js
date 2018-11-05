import CreateUpdateForm from './CreateUpdateForm'
import {connect} from 'react-redux'
import {updateProduct} from '../../store/product'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitChange: (product, id) => dispatch(updateProduct(product, id, ownProps.history))
  }
}

export default connect(null, mapDispatchToProps)(CreateUpdateForm)
