import axios from 'axios'
// import history from '../history'

const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'

const defaultState = {order: []}

const addOrder = (order) => ({type: ADD_ORDER_ITEM, order })
const removeOrderItem = (selectedItem) => ({ type: REMOVE_ORDER_ITEM, selectedItem})

export const addItemToOrder = (id) => async dispatch => {
  try {
    // const prod = await axios.get(`/api/products/${id}`)
    const order = await axios.put(`/api/orders`, {id})
    dispatch(addOrder(order.data))
    // history.push('/something')
  } catch (err) {
    console.error(err)
  }
}

export const removeOrderItemThunk = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/order/${id}`)
      dispatch(removeOrderItem(response.data))
    }
    catch(err) {
      console.log(err)
    }
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REMOVE_ORDER_ITEM:
      return {...state, order: state.order.filter(eachItem => +eachItem.id !== +action.id)}
    case ADD_ORDER_ITEM:
      return {...state, order: [...state.order, action.selectedItem]}
    default:
      return state
  }
}

