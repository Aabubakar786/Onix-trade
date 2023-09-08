/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, ReactNode} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import { useLocation } from 'react-router-dom'

type Props = {
  element: ReactNode
}
const RetailersWrapper: FC<Props> = ({element}) => {
  const location = useLocation()

  return (
    <>
      <PageTitle
        breadcrumbs={[]}
        showAddButton
        addButtonText={location.pathname?.split("/")?.length !== 2 ? "" : 'New Retailer'}
        addButtonURL='/retailers/add'
      >
        Retailers
      </PageTitle>
      <div className='row gy-5 gx-xl-8'>
        <div className='col-12 '>{element}</div>
      </div>
    </>
  )
}

export {RetailersWrapper}
