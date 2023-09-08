import React, { useEffect, useState } from 'react'
import PaginationPerPage from '../PaginationPerPage'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { ICategory, IProduct } from '../../../setup/interfaces'
import ProductsFilters from './Products.Filters'
import ProductsSearch from './Products.Search'
import clsx from 'clsx'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../setup'
import * as productRedux from './redux/ProductRedux'
import { IProductState } from './redux/ProductRedux'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import ProductDelete from './Product.Delete'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../categories/redux/CategoriesCRUD'
import { numberFormatter } from '../../../setup/utils'

const ProductsList: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([])

  const { products, filters, loading } = useSelector<RootState>(
    ({ products }) => products,
    shallowEqual
  ) as IProductState
  const dispatch = useDispatch()
  useEffect(() => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        console.log({ err })
      })
  }, [])
  useEffect(() => {
    delete filters.total
    delete filters.searchKeyword
    delete filters.provider
    delete filters.perPage
    delete filters.pageNo
    dispatch(productRedux.actions.getProducts(filters))
  }, [])

  const onPageChange = (selectedItem: { selected: number }) => {
    delete filters.total;
    filters.pageNo = selectedItem.selected + 1;
    dispatch(
      productRedux.actions.getProducts(filters)
    )
  }
  const onPerPageChange = (newPerPage: number) => {
    delete filters.total;
    filters.perPage = newPerPage;
    dispatch(productRedux.actions.getProducts(filters))
  }

  return (
    <CustomCard
      title='Dashbaord'
      // subtitle={`Over ${numberFormatter.format(filters.total || 0)} items`}
      // totalHover={JSON.stringify(filters.total?.toLocaleString())}
      headerClassName='border-0 pt-5'
      toolbar={
        <span className='d-flex align-items-stretch'>
          <div className={clsx('d-flex align-items-stretch h-35px' )}>
            <ProductsFilters />

          </div>
          <div className={clsx('d-flex align-items-stretch')}>
            <ProductsSearch  />
          </div>
        </span>
      }
    >
    
      {/* <div className='table-responsive'>
     
        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
      
          <thead>
            <tr className='fw-bolder text-muted'>
              <th className='min-w-150px'>Product Name</th>
              <th className='min-w-140px'>Status</th>
              <th className='min-w-120px'>Category</th>
              <th className='min-w-100px text-end'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <ProductTableSkeleton columns={4} />
            ) : (
              products?.map((product: IProduct) => (
                <tr key={product?.id}>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src={product.images?.additional_images?.[0]} alt={product?.title} />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bolder text-hover-primary fs-6 w-150px text-truncate'>
                          {product?.title}
                        </span>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {product?.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className='badge badge-light-primary fw-bolder px-4 py-3'>
                      {product?.availability?.replace('_', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className='text-muted fw-bold text-muted '>
                      {
                        categories?.find(
                          (category: ICategory) => category?.id === product?.categoryId
                        )?.name
                      }
                    </span>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                        <i className='bi bi-eye-fill svg-icon-3' />
                      </button>
                      <Link
                        to={`/products/edit/${product?.id}`}
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i className='bi bi-pencil-fill svg-icon-3' />
                      </Link>
                      <ProductDelete id={product?.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
         
        </table>
   
      </div>
      <PaginationPerPage
        perPage={filters.perPage || 10}
        pageNo={filters.pageNo || 1}
        onPerPageChange={onPerPageChange}
        onPageChange={onPageChange}
        totalCount={filters.total || 0}
        dataLength={products.length || 0}
      /> */}

    </CustomCard>
  )
}

export { ProductsList }
//testcommit