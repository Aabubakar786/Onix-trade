import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {IProduct, IProductFilters} from '../../../../setup/interfaces'
import {put, takeLatest} from 'redux-saga/effects'
import {getProducts} from './ProductsCRUD'
import {AxiosResponse} from 'axios'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GET_PRODUCTS: '[GET_PRODUCTS] Action',
  SET_PRODUCTS: '[SET_PRODUCTS] Action',
  SET_FILTERS: '[SET_FILTERS] Action',
  PRODUCTS_LOADING: '[PRODUCTS_LOADING] Action',
}

const initialProductState: IProductState = {
  products: [],
  filters: {
    pageNo: 1,
    perPage: 10,
    total: 0,
    status: undefined,
    provider: undefined,
    searchKeyword: undefined,
  },
  loading: false,
}

export interface IProductState {
  products: IProduct[]
  filters: IProductFilters
  loading: boolean
}

export const reducer = persistReducer(
  {storage, key: 'products', whitelist: ['products', 'filters']},
  (state: IProductState = initialProductState, action: ActionWithPayload<IProductState>) => {
    switch (action.type) {
      case actionTypes.SET_PRODUCTS: {
        const products = action.payload?.products || []
        return {
          ...state,
          products: products,
          loading: false,
        }
      }

      case actionTypes.SET_FILTERS: {
        const filters = action.payload?.filters
        return {...state, filters: {...state.filters, ...filters}}
      }
      case actionTypes.PRODUCTS_LOADING: {
        const loading = action.payload?.loading
        return {...state, loading: !!loading}
      }

      default:
        return state
    }
  }
)

export const actions = {
  setProducts: (products: IProduct[]) => ({
    type: actionTypes.SET_PRODUCTS,
    payload: {products},
  }),
  setFilters: (filters: IProductFilters) => ({type: actionTypes.SET_FILTERS, payload: {filters}}),
  getProducts: (filters: IProductFilters) => ({type: actionTypes.GET_PRODUCTS, payload: {filters}}),
  setProductsLoading: (loading: boolean) => ({
    type: actionTypes.PRODUCTS_LOADING,
    payload: {loading},
  }),
}

function* getProductsSaga({
  payload: {filters},
}: {
  type: typeof actionTypes.GET_PRODUCTS
  payload: {filters: IProductFilters}
}): Generator {
  try {
    yield put(actions.setProductsLoading(true))
    const res = yield getProducts(filters)
    yield put(
      actions.setFilters({
        ...filters,
        total: (res as AxiosResponse).data.response?.data?.totalItems,
      })
    )
    yield put(actions.setProducts((res as AxiosResponse).data.response?.data?.data))
  } catch (e) {
    console.log({e})
    yield put(actions.setProductsLoading(false))
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_PRODUCTS, getProductsSaga)
}
