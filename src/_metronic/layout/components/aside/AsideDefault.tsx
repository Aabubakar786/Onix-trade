/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import * as auth from '../../../../app/modules/auth/redux/AuthRedux'
import { useDispatch } from 'react-redux'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(auth.actions.logout())
  }

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div className='aside-logo flex-column-auto' id='kt_aside_logo'>
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/products'>
            <img
              alt='Logo'
              className='h-30px logo'
              src={toAbsoluteUrl('/media/logos/tc-logo-white.svg')}
            />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/products'>
            <img
              alt='Logo'
              className='h-30px logo'
              src={toAbsoluteUrl('/media/logos/tc-logo-header.png')}
            />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}

      {/* begin::Footer */}
      <div onClick={logout} className='aside-footer flex-column-auto px-5 mb-3 pb-4' id='kt_aside_footer'>
        <div
          style={{background: "#373634"}}
          className='btn w-100'
        >
          <span className='btn-label fs-6 pe-1 ' style={{color: "#A4A4A4"}}>Logout</span>
        </div>
      </div>

      {/* end::Footer */}
    </div>
  )
}

export {AsideDefault}
