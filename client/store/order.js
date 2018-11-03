import axios from 'axios'

const UPDATE_CART = 'UPDATE_CART'


const defaultState = {cart: [], quantity: []}

const updateCart = (order) => ({type: UPDATE_CART, order })

export const addItemToOrder = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/add/${id}`)
    dispatch(updateCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getWholeCart = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(updateCart(res.data))
  }
  catch(err) {
    console.error(err)
  }
}

export const removeItemToOrder = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/orders/remove/${id}`)
    dispatch(updateCart(res.data))
  }
  catch(err) {
    console.error(err)
  }
}

export const updateItem = (products, quantity) => async dispatch => {
  try {
    const res = await axios.put('/api/orders/update', {cart: products, quantity: quantity})
    dispatch(updateCart(res.data))
  } catch(err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {...state, cart: action.order.cart, quantity: action.order.quantity}
    default:
      return state
  }
}

