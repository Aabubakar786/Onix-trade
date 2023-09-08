import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {IRetailer, IRetailerFilters} from '../../../../setup/interfaces'
import {put, takeLatest} from 'redux-saga/effects'
import {getRetailers} from './RetailersCRUD'
import {AxiosResponse} from 'axios'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GET_RETAILERS: '[GET_RETAILERS] Action',
  SET_RETAILERS: '[SET_RETAILERS] Action',
  SET_FILTERS: '[SET_FILTERS] Action',
  RETAILERS_LOADING: '[RETAILERS_LOADING] Action',
}

const initialRetailerState: IRetailerState = {
  retailers: [],
  retailerFilters: {
    pageNo: 1,
    perPage: 10,
    total: 0,
    statusId: undefined,
  },
  loading: false,
}

export interface IRetailerState {
  retailers: IRetailer[]
  retailerFilters: IRetailerFilters
  loading: boolean
}

export const reducer = persistReducer(
  {storage, key: 'retailers', whitelist: ['retailers', 'retailerFilters']},
  (state: IRetailerState = initialRetailerState, action: ActionWithPayload<IRetailerState>) => {
    switch (action.type) {
      case actionTypes.SET_RETAILERS: {
        const retailers = action.payload?.retailers || []
        return {
          ...state,
          retailers: retailers,
          loading: false,
        }
      }

      case actionTypes.SET_FILTERS: {
        const retailerFilters = action.payload?.retailerFilters
        return {...state, retailerFilters: {...state.retailerFilters, ...retailerFilters}}
      }
      case actionTypes.RETAILERS_LOADING: {
        const loading = action.payload?.loading
        return {...state, loading: !!loading}
      }

      default:
        return state
    }
  }
)

export const actions = {
  setRetailers: (retailers: IRetailer[]) => ({
    type: actionTypes.SET_RETAILERS,
    payload: {retailers},
  }),
  setFilters: (retailerFilters: IRetailerFilters) => ({type: actionTypes.SET_FILTERS, payload: {retailerFilters}}),
  getRetailers: (retailerFilters: IRetailerFilters) => ({type: actionTypes.GET_RETAILERS, payload: {retailerFilters}}),
  setRetailersLoading: (loading: boolean) => ({
    type: actionTypes.RETAILERS_LOADING,
    payload: {loading},
  }),
}

function* getRetailersSaga({
  payload: {retailerFilters},
}: {
  type: typeof actionTypes.GET_RETAILERS
  payload: {retailerFilters: IRetailerFilters}
}): Generator {
  try {
    yield put(actions.setRetailersLoading(true))
    const res = yield getRetailers(retailerFilters)
    yield put(
      actions.setFilters({
        ...retailerFilters,
        total: (res as AxiosResponse).data.response?.data?.totalItems,
      })
    )
    yield put(actions.setRetailers((res as AxiosResponse).data.response?.data?.data))
  } catch (e) {
    console.log({e})
    yield put(actions.setRetailersLoading(false))
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_RETAILERS, getRetailersSaga)
}
