/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getSelectedProduct, fetchProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product thunk creators', () => {
  let store
  let mockAxios

  const initialState = {selectedProduct: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getSelectedProduct', () => {
    it('eventually dispatches the GET_PRODUCT_SINGLE action', async () => {
      const fakeProduct = {name: 'Brick', description: 'a nice red color', price: 1.00, inventory: 10, category: 'bricks', pictureUrl: 'http://google.com'}
      mockAxios.onGet(`/api/products/1`).replyOnce(200, fakeProduct)
      await store.dispatch(getSelectedProduct(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT_SINGLE')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('fetchProducts', () => {
    it('fetchProducts: eventually dispatches the SET_PRODUCTS action', async () => {
      const products = [{name: 'Brick'}, {name: 'shale'}]
      mockAxios.onGet('/api/products').replyOnce(200, products)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(products)
    })
  })
})
