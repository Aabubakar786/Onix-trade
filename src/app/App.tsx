import axios from 'axios'
import { Suspense } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { actions } from './modules/auth'

const App = () => {
  const dispatch = useDispatch();
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.status === 401) {
      console.log('JWT EXPIRED', 'Logging Out')
      dispatch(actions.logout())
    }
    return error;
  });
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <Outlet />
          <MasterInit />
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  )
}

export { App }
