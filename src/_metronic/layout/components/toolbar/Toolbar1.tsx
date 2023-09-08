/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'

import {useLayout, usePageData} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'
import {KTSVG} from '../../../helpers'
import {Link} from 'react-router-dom'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const {showAddButton, addButtonText, addButtonURL} = usePageData()
  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        <div className='py-1'>
          {showAddButton && addButtonURL && addButtonText && (
            <Link to={addButtonURL} className='btn btn-sm d-flex align-items-center' style={{background: '#FE9300'}}>
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='pe-1 pb-1' transparent={true}/>
              <span className='fs-6 pe-1 text-white'>{addButtonText}</span>
            </Link>
          )}
        </div>
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
