import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {ICategory, ICategoryFilters} from '../../../../setup/interfaces'
import {put, takeLatest} from 'redux-saga/effects'
import {getAdminCategories} from './CategoriesCRUD'
import {AxiosResponse} from 'axios'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GET_CATEGORIES: '[GET_CATEGORIES] Action',
  SET_CATEGORIES: '[SET_CATEGORIES] Action',
  SET_FILTERS: '[SET_FILTERS] Action',
  CATEGORIES_LOADING: '[CATEGORIES_LOADING] Action',
}

const initialCategoryState: ICategoryState = {
  categories: [],
  categoryFilters: {
    pageNo: 1,
    perPage: 10,
    total: 0,
    status: undefined,
    q: undefined,
  },
  loading: false,
}

export interface ICategoryState {
  categories: ICategory[]
  categoryFilters: ICategoryFilters
  loading: boolean
}

export const reducer = persistReducer(
  {storage, key: 'categories', whitelist: ['categories', 'categoryFilters']},
  (state: ICategoryState = initialCategoryState, action: ActionWithPayload<ICategoryState>) => {
    switch (action.type) {
      case actionTypes.SET_CATEGORIES: {
        const categories = action.payload?.categories || []
        return {
          ...state,
          categories: categories,
          loading: false,
        }
      }
      case actionTypes.CATEGORIES_LOADING: {
        const loading = action.payload?.loading
        return {...state, loading: !!loading}
      }
      case actionTypes.SET_FILTERS: {
        const categoryFilters = action.payload?.categoryFilters
        return {...state, categoryFilters: {...state.categoryFilters, ...categoryFilters}}
      }
      default:
        return state
    }
  }
)

export const actions = {
  setCategories: (categories: ICategory[]) => ({
    type: actionTypes.SET_CATEGORIES,
    payload: {categories},
  }),
  getCategories: (categoryFilters: ICategoryFilters) => ({
    type: actionTypes.GET_CATEGORIES,
    payload: {categoryFilters},
  }),
  setCategoriesLoading: (loading: boolean) => ({
    type: actionTypes.CATEGORIES_LOADING,
    payload: {loading},
  }),
  setFilters: (categoryFilters: ICategoryFilters) => ({
    type: actionTypes.SET_FILTERS,
    payload: {categoryFilters},
  }),
}

function* getCategoriesSaga({
  payload: {categoryFilters},
}: {
  type: typeof actionTypes.GET_CATEGORIES
  payload: {categoryFilters: ICategoryFilters}
}): Generator {
  try {
    yield put(actions.setCategoriesLoading(true))
    const res = yield getAdminCategories(categoryFilters)
    const data = (res as AxiosResponse)?.data?.response?.data
    yield put(
      actions.setFilters({
        ...categoryFilters,
        total: data?.totalItems || data?.data?.length || 0,
      })
    )
    yield put(actions.setCategories(data?.data || []))
  } catch (e) {
    yield put(actions.setCategoriesLoading(false))
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_CATEGORIES, getCategoriesSaga)
}
