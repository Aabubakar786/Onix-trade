import React, { useEffect } from 'react'
import PaginationPerPage from '../PaginationPerPage'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { IScrapper } from '../../../setup/interfaces'
import ScrappersFilters from './Scrappers.Filters'
import clsx from 'clsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as productRedux from './redux/ScrappersRedux'
import { IScrapperState } from './redux/ScrappersRedux'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import { Link } from 'react-router-dom'
import { numberFormatter } from '../../../setup/utils'
import ScrapperDelete from './Scrappers.Delete'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import ScrapperSearch from './Scrappers.Search'

const ScrappersList: React.FC = () => {
  const { scrappers, scrapperFilters, loading } = useSelector<RootState>(
    ({ scrappers }) => scrappers,
    shallowEqual
  ) as IScrapperState
  const dispatch = useDispatch()
  useEffect(() => {
    delete scrapperFilters.total
    delete scrapperFilters.q
    delete scrapperFilters.status
    delete scrapperFilters.perPage
    delete scrapperFilters.pageNo
    dispatch(productRedux.actions.getScrappers(scrapperFilters))
  }, [])
  const onPageChange = (selectedItem: { selected: number }) => {
    delete scrapperFilters.total;
    scrapperFilters.pageNo = selectedItem.selected + 1;
    dispatch(
      productRedux.actions.getScrappers(scrapperFilters)
    )
  }
  const onPerPageChange = (newPerPage: number) => {
    delete scrapperFilters.total;
    scrapperFilters.perPage = newPerPage;
    dispatch(productRedux.actions.getScrappers(scrapperFilters))
  }

  return (
    <CustomCard
      title='Scrappers List'
      subtitle={`Over ${numberFormatter.format(scrapperFilters.total || 0)} items`}
      totalHover={JSON.stringify(scrapperFilters.total)}
      headerClassName='border-0 pt-5'
      toolbar={
        <span className='d-flex align-items-stretch'>
          <div className={clsx('d-flex align-items-stretch h-35px')}>
            <ScrappersFilters />

          </div>
          <div className={clsx('d-flex align-items-stretch')}>
            <ScrapperSearch />
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
              <th className='w-200px '>Scrapper Name</th>
              <th className='w-200px min-w-50px text-center'>Total Products</th>
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
              scrappers.map((scrapper: IScrapper) => (
                <tr key={scrapper.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img
                          alt=''
                          src={scrapper.logo || toAbsoluteUrl('/media/logos/defCategory.png')}
                          className='mw-100'
                          onError={(e: any) => {
                            e.target.onerror = null
                            e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                          }}
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bolder text-hover-primary fs-6 w-150px text-truncate'>
                          {scrapper.name}
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
                      {scrapper.description}
                    </span>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                    <Link to={`/scrappers/${scrapper.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-eye-fill svg-icon-3' />
                      </Link>
                      {/* <Link
                        to={`/scrappers/edit/${scrapper.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill svg-icon-3' />
                      </Link> */}
                      <Link
                        to={'#'}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pause-circle-fill svg-icon-3' />
                      </Link>
                      <ScrapperDelete id={scrapper.id} />
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
        perPage={scrapperFilters.perPage || 10}
        pageNo={scrapperFilters.pageNo || 1}
        onPerPageChange={onPerPageChange}
        onPageChange={onPageChange}
        totalCount={scrapperFilters.total || 0}
        dataLength={scrappers.length}
      />
      {/* end: pagination */}
    </CustomCard>
  )
}

export { ScrappersList }

