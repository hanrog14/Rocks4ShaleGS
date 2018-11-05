import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Searchbar from './Searchbar'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => {
  return (
    <div>
      <h1>Welcome to Rocks 4 Shale!</h1>
      <nav>
        <Link to="/products/category/all">All</Link>
        <Link to="/products/category/Igneous">Igneous</Link>
        <Link to="/products/category/Metamorphic">Metamorphic</Link>
        <Link to="/products/category/Sedimentary">Sedimentary</Link>
        <Link to="/products/category/Miscellaneous">Miscellaneous</Link>
        <Link to="/checkout">Checkout</Link>
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/tasks">Admin Orders View</Link>}
        <Searchbar />
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <Link to={`/history/${userId}`}>Order History</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: state.user.adminStatus
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
