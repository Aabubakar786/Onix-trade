import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {MenuTestPage} from '../pages/MenuTestPage'
import {ProductsWrapper} from '../pages/products/ProductsWrapper'
import {ProductsList} from '../modules/products/Products.List'
import ProductCreate from '../pages/products/Product.Create'
import {CategoriesWrapper} from '../pages/categories/CategoriesWrapper'
import CategoriesCreate from '../pages/categories/Categories.Create'
import {CategoriesList} from '../modules/categories/Categories.List'
import {CategoryView} from '../modules/categories/Category.View'
import {RetailersWrapper} from '../pages/retailers/RetailersWrapper'
import RetailersCreate from '../pages/retailers/Retailers.Create'
import { RetailersList } from '../modules/retailers/Retailers.List'
import { RetailerView } from '../modules/retailers/Retailer.View'
import { ScrappersList } from '../modules/scrappers/Scrappers.List'
import { ScrappersWrapper } from '../pages/scrappers/ScrappersWrapper'
import ScrappersCreate from '../pages/scrappers/Scrappers.Create'
import { ScrappersView } from '../modules/scrappers/Scrappers.View'

import {WebsiteUsersWrapper} from '../pages/websiteUsers/WebsiteUsersWrapper'
import {WebsiteUsers} from '../modules/websiteUsers/WebsiteUsers.List'
import {WebsiteUserView} from '../modules/websiteUsers/WebsiteUser.View'
import WebsiteUserCreate from '../pages/websiteUsers/WebsiteUsers.Create'
const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/products' />} />
        {/* Pages */}
        <Route path='products' element={<ProductsWrapper element={<ProductsList />} />} />
        <Route path='products/edit/:id' element={<ProductsWrapper element={<ProductCreate />} />} />
        <Route path='products/add' element={<ProductsWrapper element={<ProductCreate />} />} />

        <Route path='categories' element={<CategoriesWrapper element={<CategoriesList />} />} />
        <Route
          path='categories/add'
          element={<CategoriesWrapper element={<CategoriesCreate />} />}
        />
        <Route
          path='categories/edit/:id'
          element={<CategoriesWrapper element={<CategoriesCreate />} />}
        />
        <Route path='categories/:id' element={<CategoriesWrapper element={<CategoryView />} />} />

        <Route path='retailers' element={<RetailersWrapper element={<RetailersList />} />} />
        <Route path='retailers/add' element={<RetailersWrapper element={<RetailersCreate />} />} />
        <Route
          path='retailers/edit/:id'
          element={<RetailersWrapper element={<RetailersCreate />} />}
        />
        {/* Website Users */}
        <Route path='users' element={<WebsiteUsersWrapper element={<WebsiteUsers />} />} />
        <Route path='users/:id' element={<WebsiteUsersWrapper element={<WebsiteUserView />} />} />
        <Route path='users/add' element={<WebsiteUsersWrapper element={<WebsiteUserCreate />} />} />
        <Route
          path='users/edit/:id'
          element={<WebsiteUsersWrapper element={<WebsiteUserCreate />} />}
        />
        <Route path='retailers/edit/:id' element={<RetailersWrapper element={<RetailersCreate />} />} />
        <Route path='retailers/:id' element={<RetailersWrapper element={<RetailerView />} />} />


        <Route path='scrappers' element={<ScrappersWrapper element={<ScrappersList />} />} />
        <Route path='scrappers/add' element={<ScrappersWrapper element={<ScrappersCreate />} />} />
        <Route path='scrappers/edit/:id' element={<ScrappersWrapper element={<ScrappersCreate />} />} />
        <Route path='scrappers/:id' element={<ScrappersWrapper element={<ScrappersView />} />} />

        {/* <Route path='users' element={<MenuTestPage />} />
        <Route path='scrappers' element={<MenuTestPage />} />
        <Route path='channels' element={<MenuTestPage />} /> */}
        {/*/!* Lazy Modules *!/*/}
        {/*<Route*/}
        {/*  path='users'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <ProfilePage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='scrappers'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <WizardsPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='channels'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <WidgetsPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='crafted/account/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <AccountPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='apps/chat/*'*/}
        {/*  element={*/}
        {/*    <SuspensedView>*/}
        {/*      <ChatPage />*/}
        {/*    </SuspensedView>*/}
        {/*  }*/}
        {/*/>*/}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

// const SuspensedView: FC = ({children}) => {
//   const baseColor = getCSSVariableValue('--bs-primary')
//   TopBarProgress.config({
//     barColors: {
//       '0': baseColor,
//     },
//     barThickness: 1,
//     shadowBlur: 5,
//   })
//   return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
// }

export {PrivateRoutes}
