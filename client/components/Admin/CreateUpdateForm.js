import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getNewProduct, updateProduct} from '../../store/product'

const checkRequired = (object) => {
  return object.name && object.description && object.price && object.inventory && object.category && object.pictureUrl
}

class CreateUpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectProps: this.props.location.state || {},
      errMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let newObjProps = { ...this.state.objectProps, [event.target.name]: event.target.value }
    this.setState({objectProps: newObjProps})
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!checkRequired(this.state.objectProps)) {
      this.setState({ errMessage: 'Please fill in all required values' })
    } else {
      this.props.submitChange(this.state.objectProps, this.props.match.params.id);
      this.setState({ objectProps: {}, errMessage: null });
    }
  }

  render() {
    const isAdmin = this.props.user.adminStatus
    return (
      <div className="order-history">
        {isAdmin ?
          <form onSubmit={this.handleSubmit}>
            <div>
              <h1>Please Fill out the Product Form</h1>
              <div className="inputContainer">
                <div className="inputElem">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Product name.."
                    onChange={this.handleChange}
                    value={this.state.objectProps.name}
                  />
                </div>
                <div className="inputElem">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Product description.."
                    onChange={this.handleChange}
                    value={this.state.objectProps.description}
                  />
                </div>
                <div className="inputElem">
                  <label>Picture URL</label>
                  <input
                    type="text"
                    name="pictureUrl"
                    placeholder="Product picture url.."
                    onChange={this.handleChange}
                    value={this.state.objectProps.pictureUrl}
                  />
                </div>
                <div className="inputElem">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Product price.."
                    onChange={this.handleChange}
                    value={this.state.objectProps.price}
                  />
                </div>
                <div className="inputElem">
                  <label>Inventory</label>
                  <input
                    type="text"
                    name="inventory"
                    placeholder="Product inventory.."
                    onChange={this.handleChange}
                    value={this.state.objectProps.inventory}
                  />
                </div>
                <label>Category</label>
                <select className="inputElem" name="category" onChange={this.handleChange} value={this.state.objectProps.category}>
                  <option value="--">--</option>
                  <option value="Igneous">Igneous</option>
                  <option value="Metamorphic">Metamorphic</option>
                  <option value="Sedimentary">Sedimentary</option>
                  <option value="Miscellaneous">Miscellaneous</option>
                </select>
              </div>
            </div>
            <div>
              <button type="submit">Submit</button>
              {this.state.errMessage && <h4 id="errMessage">{this.state.errMessage}</h4>}
            </div>
          </form> :
          <h1>Forbidden Content</h1>
        }
      </div>
    )
  }
}

const mapCreateProductDispatch = (dispatch, ownProps) => {
  return {
    submitChange: (product) => dispatch(getNewProduct(product, ownProps.history))
  }
}

const mapUpdateProductDispatch = (dispatch, ownProps) => {
  return {
    submitChange: (product, id) => dispatch(updateProduct(product, id, ownProps.history))
  }
}

const mapStateToProps = (state) => {
  return {
   user: state.user
  }
}

export const CreateProduct = connect(mapStateToProps, mapCreateProductDispatch)(CreateUpdateProduct)
export const UpdateProduct = connect(mapStateToProps, mapUpdateProductDispatch)(CreateUpdateProduct)
