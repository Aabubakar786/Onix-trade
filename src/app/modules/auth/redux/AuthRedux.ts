import {Action} from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {UserModel} from '../models/UserModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
}

export interface IAuthState {
  user?: UserModel
  accessToken?: string
}

export const reducer = persistReducer(
  {storage, key: 'v100-demo1-auth', whitelist: ['user', 'accessToken']},
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const accessToken = action.payload?.accessToken
        const user = action.payload?.user
        return {accessToken, user}
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (accessToken: string, user: UserModel) => ({
    type: actionTypes.Login,
    payload: {accessToken, user},
  }),

  logout: () => ({type: actionTypes.Logout}),
}

export function* saga() {}
