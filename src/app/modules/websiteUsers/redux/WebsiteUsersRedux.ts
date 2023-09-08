import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {IUser, IUserFilters} from '../../../../setup/interfaces'
import {put, takeLatest} from 'redux-saga/effects'
import {getAdminUsers} from './WebsiteUsersCRUD'
import {AxiosResponse} from 'axios'
export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  GET_USERS: '[GET_USERS] Action',
  SET_USERS: '[SET_USERS] Action',
  SET_FILTERS: '[SET_FILTERS] Action',
  USERS_LOADING: '[USERS_LOADING] Action',
}

const initialUserState: IUserState = {
  users: [],
  userFilters: {
    pageNo: 1,
    perPage: 10,
    total: 0,
    status: undefined,
    q: undefined,
  },
  loading: false,
}

export interface IUserState {
  users: IUser[]
  userFilters: IUserFilters
  loading: boolean
}

export const reducer = persistReducer(
  {storage, key: 'users', whitelist: ['users', 'userFilters']},
  (state: IUserState = initialUserState, action: ActionWithPayload<IUserState>) => {
    switch (action.type) {
      case actionTypes.SET_USERS: {
        const users = action.payload?.users || []
        return {
          ...state,
          users: users,
          loading: false,
        }
      }
      case actionTypes.USERS_LOADING: {
        const loading = action.payload?.loading
        return {...state, loading: !!loading}
      }
      case actionTypes.SET_FILTERS: {
        const userFilters = action.payload?.userFilters
        return {...state, userFilters: {...state.userFilters, ...userFilters}}
      }
      default:
        return state
    }
  }
)

export const actions = {
  setUsers: (users: IUser[]) => ({
    type: actionTypes.SET_USERS,
    payload: {users},
  }),
  getUsers: (userFilters: IUserFilters) => ({
    type: actionTypes.GET_USERS,
    payload: {userFilters},
  }),
  setUsersLoading: (loading: boolean) => ({
    type: actionTypes.USERS_LOADING,
    payload: {loading},
  }),
  setFilters: (userFilters: IUserFilters) => ({
    type: actionTypes.SET_FILTERS,
    payload: {userFilters},
  }),
}

function* getUsersSaga({
  payload: {userFilters},
}: {
  type: typeof actionTypes.GET_USERS
  payload: {userFilters: IUserFilters}
}): Generator {
  try {
    yield put(actions.setUsersLoading(true))
    const res = yield getAdminUsers(userFilters)
    const data = (res as AxiosResponse).data.response?.data
    yield put(
      actions.setFilters({
        ...userFilters,
        total: data?.totalItems || data?.data?.length || 0,
      })
    )
    yield put(actions.setUsers(data?.data || []))
  } catch (e) {
    yield put(actions.setUsersLoading(false))
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_USERS, getUsersSaga)
}
