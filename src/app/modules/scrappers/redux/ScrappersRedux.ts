import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IScrapper, IScrapperFilters } from '../../../../setup/interfaces'
import { put, takeLatest } from 'redux-saga/effects'
import { getScrappers } from './ScrappersCRUD'
import { AxiosResponse } from 'axios'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GET_SCRAPPERS: '[GET_SCRAPPERS] Action',
  SET_SCRAPPERS: '[SET_SCRAPPERS] Action',
  SET_FILTERS: '[SET_FILTERS] Action',
  SCRAPPERS_LOADING: '[SCRAPPERS_LOADING] Action',
}

const initialScrapperState: IScrapperState = {
  scrappers: [],
  scrapperFilters: {
    pageNo: 1,
    perPage: 10,
    total: 0,
    status: undefined,
  },
  loading: false,
}

export interface IScrapperState {
  scrappers: IScrapper[]
  scrapperFilters: IScrapperFilters
  loading: boolean
}

export const reducer = persistReducer(
  { storage, key: 'scrappers', whitelist: ['scrappers', 'scrapperFilters'] },
  (state: IScrapperState = initialScrapperState, action: ActionWithPayload<IScrapperState>) => {
    switch (action.type) {
      case actionTypes.SET_SCRAPPERS: {
        const scrappers = action.payload?.scrappers || []
        return {
          ...state,
          scrappers: scrappers,
          loading: false,
        }
      }

      case actionTypes.SET_FILTERS: {
        const scrapperFilters = action.payload?.scrapperFilters
        return { ...state, scrapperFilters: { ...state.scrapperFilters, ...scrapperFilters } }
      }
      case actionTypes.SCRAPPERS_LOADING: {
        const loading = action.payload?.loading
        return { ...state, loading: !!loading }
      }

      default:
        return state
    }
  }
)

export const actions = {
  setScrappers: (scrappers: IScrapper[]) => ({
    type: actionTypes.SET_SCRAPPERS,
    payload: { scrappers },
  }),
  setFilters: (scrapperFilters: IScrapperFilters) => ({ type: actionTypes.SET_FILTERS, payload: { scrapperFilters } }),
  getScrappers: (scrapperFilters: IScrapperFilters) => ({ type: actionTypes.GET_SCRAPPERS, payload: { scrapperFilters } }),
  setScrappersLoading: (loading: boolean) => ({
    type: actionTypes.SCRAPPERS_LOADING,
    payload: { loading },
  }),
}

function* getScrappersSaga({
  payload: { scrapperFilters },
}: {
  type: typeof actionTypes.GET_SCRAPPERS
  payload: { scrapperFilters: IScrapperFilters }
}): Generator {
  try {
    yield put(actions.setScrappersLoading(true))
    const res = yield getScrappers(scrapperFilters)
    yield put(
      actions.setFilters({
        ...scrapperFilters,
        total: (res as AxiosResponse).data.response?.data?.totalItems,
      })
    )
    yield put(actions.setScrappers((res as AxiosResponse).data.response?.data?.res))
  } catch (e) {
    console.log({ e })
    yield put(actions.setScrappersLoading(false))
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_SCRAPPERS, getScrappersSaga)
}
