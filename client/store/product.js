import axios from 'axios'

// action types
const SET_PRODUCTS = 'SET_PRODUCTS'

// action creator
const setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
})

// thunk
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


