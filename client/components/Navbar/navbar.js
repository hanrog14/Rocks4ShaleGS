import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'
import Searchbar from './Searchbar'

const Navbar = ({handleClick, isLoggedIn, userId, isAdmin}) => {
  return (
    <div className="fixed-nav">
      <h1>Rocks 4 Shale</h1>
      <nav>
        <div className="nav-bar">
        <ul>
        <li className='nav-li'><Link to="/products/category/all">All</Link></li>
        <li className='nav-li'><Link to="/products/category/Igneous">Igneous</Link></li>
        <li className='nav-li'><Link to="/products/category/Metamorphic">Metamorphic</Link></li>
        <li className='nav-li'><Link to="/products/category/Sedimentary">Sedimentary</Link></li>
        <li className='nav-li'><Link to="/products/category/Miscellaneous">Miscellaneous</Link></li>
        <li className='cart'><Link to="/cart">Cart</Link></li>
        {isAdmin && <li><Link to="/tasks">Admin Orders View</Link></li>}
        </ul>
        <Searchbar />

        </div>
        {isLoggedIn ? (
          <div className="login">
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
