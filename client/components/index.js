/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar/navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as SingleProduct} from './Main/SingleProduct'
export {default as ProductList} from './Main/ProductList'
export {default as CartList} from './Main/CartList'
export {default as CreateProduct} from './Admin/CreateProduct'
export {default as UpdateProduct} from './Admin/UpdateProduct'
export {default as CreateReview} from './Main/CreateReview'
export {Confirmation} from './Checkout/Confirmation'
export {default as OrderHistory} from './Main/OrderHistory'
export {default as SingleOrder} from './Main/SingleOrder'
export {default as AdminOrdersView} from './Admin/AdminOrdersView'
export {default as Shipping} from './Checkout/Shipping'
