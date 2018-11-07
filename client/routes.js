import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, SingleProduct, ProductList, CartList, CreateProduct, UpdateProduct, CreateReview, Confirmation, OrderHistory, SingleOrder, AdminOrdersView} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartList} />
        <Route path='/tasks' component={AdminOrdersView} />
        <Route path='/confirmation' component={Confirmation} />
        <Route path="/history/:id" component={OrderHistory} />
        <Route path="/orders/:id" component={SingleOrder} />
        <Route path="/products/create" component={CreateProduct} />
        <Route path="/products/:id/review" component={CreateReview} />
        <Route path="/products/:id/update" component={UpdateProduct} />
        <Route path='/products/category/:category' component={ProductList} />
        <Route path='/products/name/:name' component={ProductList} />
        <Route path="/products/:id" component={SingleProduct} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        <Redirect to='/products/category/all'/>
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
