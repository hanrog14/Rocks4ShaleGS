import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store'
import Searchbar from './Searchbar'

const Navbar = ({ handleClick, isLoggedIn, userId }) => {
  return (
    <div className="fixed-nav">
      <nav>
        <div className="nav-bar">
          <ul>
            <li className='nav-li' id="nav-home"><Link to="/products/category/all">Rocks 4 Shale</Link></li>
            <li className='nav-li'><Link to="/products/category/Igneous">Igneous</Link></li>
            <li className='nav-li'><Link to="/products/category/Metamorphic">Metamorphic</Link></li>
            <li className='nav-li'><Link to="/products/category/Sedimentary">Sedimentary</Link></li>
            <li className='nav-li'><Link to="/products/category/Miscellaneous">Miscellaneous</Link></li>
          </ul>
          <ul>
            <li className='searchbar'> <Searchbar /> </li>
          </ul>
        </div>
        <div className="login">
          <ul>
            <li className='user-nav'>
              <Link to="/cart">🛒</Link>
            </li>
            <li className='user-nav'>
              <Link to={isLoggedIn ? "/home" : "/login"}>{isLoggedIn ? "Home" : "Login"}</Link>
            </li>
            <li className='user-nav'>
              <Link to={isLoggedIn ? `/history/${userId}` : "/signup"}>{isLoggedIn ? 'Order History' : 'Sign Up'}</Link>
            </li>
            {isLoggedIn && <li className='user-nav'><a href="#" onClick={handleClick}>Logout</a></li>}
          </ul>
        </div>
      </nav>
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
