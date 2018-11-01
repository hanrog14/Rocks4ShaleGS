import axios from 'axios'

const ADD_CART_ITEM = 'ADD_CART_ITEM'

const defaultState = {cart: []}

const addCart = (cart) => ({type: ADD_CART_ITEM, cart })

export const addItemToOrder = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/add/${id}`)
    dispatch(addCart(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {...state, cart: action.cart}
    default:
      return state
  }
}

