import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import product from './product'
import order from './order'

const reducer = combineReducers({user, product, order})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
