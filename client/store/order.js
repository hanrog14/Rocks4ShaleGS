import axios from 'axios'

const UPDATE_CART = 'UPDATE_CART'


const defaultState = {cart: []}

const updateCart = (cart) => ({type: UPDATE_CART, cart })

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

export default function(state = defaultState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

