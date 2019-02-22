import axios from 'axios'
import history from '../history'

const UPDATE_CART = 'UPDATE_CART'
const UPDATE_PREV_ORDERS = 'UPDATE_PREV_ORDERS'
const GET_ORDER = 'UPDATE_ORDER'

const defaultState = {
  cart: [],
  quantity: [],
  prevOrders: [],
  curOrderProducts: {
    products: [],
    order: {}
  }
}

const updateCart = order => ({type: UPDATE_CART, order})
const gotPrevOrders = orders => ({type: UPDATE_PREV_ORDERS, orders})
const gotCurrentOrder = products => ({type: GET_ORDER, products})

export const getWholeCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/cart')
    dispatch(updateCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addItemToOrder = id => async dispatch => {
  try {
    const res = await axios.post('/api/cart/add', {id})
    dispatch(updateCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const removeItemFromOrder = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/cart/remove/${id}`)
    dispatch(updateCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateItem = (cart, quantity) => async dispatch => {
  try {
    const res = await axios.put('/api/cart/update', {cart, quantity})
    dispatch(updateCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const submitOrder = shippingInfo => async dispatch => {
  try {
    const res = await axios.post('/api/orders/create', shippingInfo)
    dispatch(updateCart(res.data))
    history.push('/confirmation')
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllOrders = () => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/history`)
    dispatch(gotPrevOrders(res.data))
  }
  catch(err) {
    console.error(err)
  }
}

export const fetchOrderHistory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/history/${id}`)
    dispatch(gotPrevOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOrder = id => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/${id}`)
    dispatch(gotCurrentOrder(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {...state, curOrderProducts: action.products}
    case UPDATE_CART:
      return {...state, cart: action.order.cart, quantity: action.order.quantity}
    case UPDATE_PREV_ORDERS:
      return {...state, prevOrders: action.orders}
    default:
      return state
  }
}
