import React, {Component} from 'react'
import {connect} from 'react-redux'
import {submitOrder} from '../store/order'

const checkRequired = (object) => {
  return object.email && object.address && object.city && object.state && object.zip
}

class CreateUpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objectProps: {},
      errMessage: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let newObjProps = {...this.state.objectProps, [event.target.name]: event.target.value}
    this.setState({
      objectProps: newObjProps
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!checkRequired(this.state.objectProps)) {
      this.setState({errMessage: 'Please fill in all required values'})
    } else {
      this.props.submitChange(this.state.objectProps, this.props.match.params.id);
      this.setState({objectProps: {}, errMessage: null});
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <h1>Please Fill out the Shipping Form</h1>
          <div className="inputContainer">
            <div className="inputElem">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email address.."
                onChange={this.handleChange}
                value={this.state.objectProps.email}
              />
            </div>
            <div className="inputElem">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Shipping Address.."
                onChange={this.handleChange}
                value={this.state.objectProps.address}
              />
            </div>
            <div className="inputElem">
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="City.."
                onChange={this.handleChange}
                value={this.state.objectProps.city}
              />
            </div>
            <div className="inputElem">
              <label>State</label>
              <input
                  type="text"
                  name="state"
                  placeholder="State.."
                  onChange={this.handleChange}
                  value={this.state.objectProps.state}
              />
            </div>
            <div className="inputElem">
              <label>Zip Code</label>
              <input
                  type="text"
                  name="zip"
                  placeholder="Zip code.."
                  onChange={this.handleChange}
                  value={this.state.objectProps.zip}
              />
            </div>
          </div>
        </div>
        <div>
            <button type="submit">Submit</button>
            {this.state.errMessage && <h4 id="errMessage">{this.state.errMessage}</h4>}
        </div>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitChange: (shippingObj) => dispatch(submitOrder(shippingObj))
  }
}

export default connect(null, mapDispatchToProps)(CreateUpdateProduct)
