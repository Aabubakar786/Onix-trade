import { all } from 'redux-saga/effects'
import { combineReducers } from 'redux'

import * as auth from '../../app/modules/auth'
import * as products from '../../app/modules/products/redux/ProductRedux'
import * as categories from '../../app/modules/categories/redux/CategoriesRedux'
import * as retailers from '../../app/modules/retailers/redux/RetailersRedux'
import * as scrappers from '../../app/modules/scrappers/redux/ScrappersRedux'
import ScrappersCreate from '../../app/pages/scrappers/Scrappers.Create'
import * as users from '../../app/modules/websiteUsers/redux/WebsiteUsersRedux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  products: products.reducer,
  categories: categories.reducer,
  retailers: retailers.reducer,
  scrappers: scrappers.reducer,
  users: users.reducer,
})
export type RootState = ReturnType<typeof rootReducer>
export function* rootSaga() {
  yield all([auth.saga(), products.saga(), categories.saga(), retailers.saga(), scrappers.saga(), users.saga()])
}
