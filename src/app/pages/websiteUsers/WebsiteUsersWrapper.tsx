/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, ReactNode} from 'react'
import {PageTitle, PageLink} from '../../../_metronic/layout/core'

type Props = {
  element: ReactNode
}
const WebsiteBreadcrumbs: Array<PageLink> = [
  {
    title: 'Website Users List',
    path: '/users',
    // isSeparator: true,
    isActive: true,
  },
]
const WebsiteUsersWrapper: FC<Props> = ({element}) => {
  return (
    <>
      <PageTitle
        breadcrumbs={[]}
        // showAddButton
        // addButtonText='New Website User'
        // addButtonURL='/users/add'
      >
        Website Users
      </PageTitle>
      <div className='row gy-5 gx-xl-8'>
        <div className='col-12 '>{element}</div>
      </div>
    </>
  )
}

export {WebsiteUsersWrapper}
