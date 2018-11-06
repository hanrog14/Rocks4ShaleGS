import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
<<<<<<< HEAD:client/components/navbar.js
import {logout} from '../store'
import {Nav, Navbar, NavItem} from 'react-bootstrap'


const Navbarr = ({handleClick, isLoggedIn, userId}) => {
=======
import {logout} from '../../store'
import Searchbar from './Searchbar'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => {
>>>>>>> origin:client/components/Navbar/navbar.js
  return (
    <div className ="topnav">
      <Navbar collapseOnSelect >
        <Link to="/products/category/Igneous">Igneous</Link>
        <Link to="/products/category/Metamorphic">Metamorphic</Link>
        <Link to="/products/category/Sedimentary">Sedimentary</Link>
        <Link to="/products/category/Miscellaneous">Miscellaneous</Link>
<<<<<<< HEAD:client/components/navbar.js

        <Link to="/products/category/all"><b>Rocks 4 Shale</b></Link>
 
        <Link to="/cart">🛒</Link>
        <input type="text" name="search-bar" placeholder="Start with a clean slate" />
        <button type="submit" value="submit">
          >
        </button>
=======
        <Link to="/checkout">Checkout</Link>
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/tasks">Admin Orders View</Link>}
        <Searchbar />
>>>>>>> origin:client/components/Navbar/navbar.js
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home">Home</Link> */}
            <Link to={`/history/${userId}`}>Order History</Link>
            {/* <a href="#" onClick={handleClick}> */}
            <a onClick={handleClick}>
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
      </Navbar>
      {/* <hr /> */}
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

export default connect(mapState, mapDispatch)(Navbarr)

/**
 * PROP TYPES
 */
Navbarr.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
