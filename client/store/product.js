import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const SET_PRODUCTS = 'SET_PRODUCTS'
const GET_PRODUCT_SINGLE = 'GET_PRODUCT_SINGLE'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const ADD_PRODUCT_REVIEW = 'ADD_PRODUCT_REVIEW'

/**
 * INITIAL STATE
 */
const defaultProduct = { products: [], selectedProduct: {} }

/**
 * ACTION CREATORS
 */
const setProducts = (products) => ({type: SET_PRODUCTS, products})
const getProduct = product => ({type: GET_PRODUCT_SINGLE, product})
const addProduct = product => ({type: ADD_PRODUCT, product})
const gotUpdatedProduct = product => ({type: UPDATE_PRODUCT, product})

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/products')
      dispatch(setProducts(res.data))
    }
    catch(err) {
      console.error(err)
    }
  }
}
export const getSelectedProduct = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`)
    dispatch(getProduct(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const getNewProduct = (productObj) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/products', productObj)
      dispatch(addProduct(res.data))
      history.push('/products/category/all')
    } catch(err) {
      console.error(err)
    }
  }
}

export const updateProduct = (product, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/products/${productId}`, product)
      dispatch(gotUpdatedProduct(res.data))
      history.push('../category/all')
    } catch(err) {
      console.error(err)
    }
  }
}

export const addReview = (review, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/products/${productId}/review`, review)
      dispatch(gotUpdatedProduct(res.data))
      history.push(`/products/${productId}`)
    } catch (err) {
      console.error(err)
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
    case ADD_PRODUCT:
      return { ...state, products: [...state.products, action.product] }
    case UPDATE_PRODUCT:
      return {...state, products: [...state.products.filter(prod => prod !== action.product.id, action.product)]}
    case SET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}

