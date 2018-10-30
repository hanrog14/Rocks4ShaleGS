import axios from 'axios'

// action types
const SET_PRODUCTS = 'SET_PRODUCTS'

// action creator
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

// thunk
// export const fetchProducts = () => {
//     return async (dispatch) => {
//         try{

//         }
//         catch(err) {

//         }
//     }
// }
