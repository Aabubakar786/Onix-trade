import React, { useEffect } from 'react'
import PaginationPerPage from '../PaginationPerPage'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { IRetailer } from '../../../setup/interfaces'
import RetailersFilters from './Retailers.Filters'
import clsx from 'clsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as productRedux from './redux/RetailersRedux'
import { IRetailerState } from './redux/RetailersRedux'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import { Link } from 'react-router-dom'
import { Statuses, numberFormatter } from '../../../setup/utils'
import RetailerDelete from './Retailers.Delete'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import RetailerSearch from './Retailers.Search'
import RetailerSuspend from './Retailer.Suspend'

const RetailersList: React.FC = () => {
  const { retailers, retailerFilters, loading } = useSelector<RootState>(
    ({ retailers }) => retailers,
    shallowEqual
  ) as IRetailerState
  const dispatch = useDispatch()
  useEffect(() => {
    delete retailerFilters.total
    delete retailerFilters.q
    delete retailerFilters.statusId
    delete retailerFilters.perPage
    delete retailerFilters.pageNo
    dispatch(productRedux.actions.getRetailers(retailerFilters))
  }, [])
  const onPageChange = (selectedItem: { selected: number }) => {
    delete retailerFilters.total;
    retailerFilters.pageNo = selectedItem.selected + 1;
    dispatch(
      productRedux.actions.getRetailers(retailerFilters)
    )
  }
  const onPerPageChange = (newPerPage: number) => {
    delete retailerFilters.total;
    retailerFilters.perPage = newPerPage;
    dispatch(productRedux.actions.getRetailers(retailerFilters))
  }

  return (
    <CustomCard
      title='Retailers List'
      subtitle={`Over ${numberFormatter.format(retailerFilters.total || 0)} items`}
      totalHover={JSON.stringify(retailerFilters.total)}
      headerClassName='border-0 pt-5'
      toolbar={
        <span className='d-flex align-items-stretch'>
          <div className={clsx('d-flex align-items-stretch h-35px')}>
            <RetailersFilters />

          </div>
          <div className={clsx('d-flex align-items-stretch')}>
            <RetailerSearch />
          </div>
        </span>
      }
    >
      {/* begin::Table container */}
      <div className='table-responsive'>
        {/* begin::Table */}
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
          {/* begin::Table head */}
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className='w-200px '>Retailer Name</th>
              <th className='w-200px min-w-50px text-center'>Products Count</th>
              <th className='min-w-120px '>Description</th>
              <th className='min-w-100px text-end pe-10'>Actions</th>
            </tr>
          </thead>
          {/* end::Table head */}
          {/* begin::Table body */}
          <tbody>
            {loading ? (
              <ProductTableSkeleton columns={4} />
            ) : (
              retailers.map((retailer: IRetailer) => (
                <tr key={retailer.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          alt=''
                          src={retailer.logo || toAbsoluteUrl('/media/logos/defCategory.png')}
                          className='mw-100'
                          onError={(e: any) => {
                            e.target.onerror = null
                            e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                          }}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bolder text-hover-primary fs-6 w-150px text-truncate'>
                          {retailer.name}
                        </span>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {retailer.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className='text-center'>
                    <span className='text-muted fw-bold text-muted '>
                      {345}
                    </span>
                  </td>
                  <td>
                    <span className='text-muted fw-bold text-muted '>
                      {retailer.description}
                    </span>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <Link to={`/retailers/${retailer.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-eye-fill svg-icon-3' />
                      </Link>
                      <Link
                        to={`/retailers/edit/${retailer.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill svg-icon-3' />
                      </Link>
                      {/* <Link
                        to={'#'}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      > */}
                        { (retailer?.status_id !== Statuses.Suspended) && <RetailerSuspend id={JSON.stringify(retailer.id)} />}
                      {/* </Link> */}
                      <RetailerDelete id={retailer.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          {/* end::Table body */}
        </table>
        {/* end::Table */}
      </div>
      {/* end::Table container */}

      {/* start: pagination */}
      <PaginationPerPage
        perPage={retailerFilters.perPage || 10}
        pageNo={retailerFilters.pageNo || 1}
        onPerPageChange={onPerPageChange}
        onPageChange={onPageChange}
        totalCount={retailerFilters.total || 0}
        dataLength={retailers.length}
      />
      {/* end: pagination */}
    </CustomCard>
  )
}

export { RetailersList }

