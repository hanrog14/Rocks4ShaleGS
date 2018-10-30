import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCT_SINGLE = 'GET_PRODUCT_SINGLE'
const SET_PRODUCTS = 'SET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProduct = { selectedProduct: {} }

/**
 * ACTION CREATORS
 */
const getProduct = product => ({type: GET_PRODUCT_SINGLE, product})
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

/**
 * THUNK CREATORS
 */
export const getSelectedProduct = (id) => async dispatch => {
  try {
    const prod = await axios.get(`/product/${id}`)
    dispatch(getProduct(prod.data))
    // history.push('/something')
  } catch (err) {
    console.error(err)
  }
}
export const fetchProducts = () => {
    return async (dispatch) => {
        try{
            const response = await axios.get('/api/products')
            dispatch(setProducts(response.data))
        }
        catch(err) {
            console.log(err)
        }
    }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT_SINGLE:
      return { ...state, selectedProduct: action.product }
    // case REMOVE_PRODUCT_SINGLE:
    //   return defaultUser
    default:
      return state
  }
}

