import axios from 'axios'
// import history from '../history'

const GET_ORDER= 'GET_ORDER'
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'

const defaultState = { order: [], selectedItem: {} }

const getOrder = (order) => ({type: GET_ORDER, order })
const addOrderItem = (selectedItem) => ({ type: ADD_ORDER_ITEM, selectedItem })
const removeOrderItem = (selectedItem) => ({ type: REMOVE_ORDER_ITEM, selectedItem})

export const fetchOrder = () => async dispatch => {
  try {
    const prod = await axios.get(`/api/order`)
    dispatch(getOrder(prod.data))
    // history.push('/something')
  } catch (err) {
    console.error(err)
  }
}
export const addOrderItemThunk = (selectedItem) => {
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/order', selectedItem)
            dispatch(addOrderItem(response.data))
        } catch(err) {
            console.log(err)
        }
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
    case GET_ORDER:
      return { ...state, order: action.order }
    case REMOVE_ORDER_ITEM:
      return {...state, order: state.order.filter(eachItem => +eachItem.id !== +action.id)}
    case ADD_ORDER_ITEM:
      return {...state, order: [...state.order, action.selectedItem]}
    default:
      return state
  }
}

