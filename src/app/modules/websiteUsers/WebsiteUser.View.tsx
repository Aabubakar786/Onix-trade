import {right} from '@popperjs/core'
import React, {useEffect, useState} from 'react'
import {Col, Row} from 'react-bootstrap'
import {useSelector, shallowEqual, useDispatch} from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import {RootState} from '../../../setup'
import {ChartsWidget3} from '../../../_metronic/partials/widgets'
import {IProductState} from '../products/redux/ProductRedux'
// import { getAllCategories, getCategory } from './redux/CategoriesCRUD'
import * as productRedux from '../products/redux/ProductRedux'
import {ICategory, IProduct} from '../../../setup/interfaces'
import clsx from 'clsx'
import {numberFormatter} from '../../../setup/utils'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import PaginationPerPage from '../PaginationPerPage'
import ProductDelete from '../products/Product.Delete'
import ProductsFilters from '../products/Products.Filters'
import ProductsSearch from '../products/Products.Search'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {getAdminSpecialDeals} from '../products/redux/ProductsCRUD'

const WebsiteUserView: React.FC = () => {
  const params = useParams()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [hotProducts, sethotProducts] = useState<IProduct[]>([])
  const [category, setCategory] = useState<any>()
  const {products, filters, loading} = useSelector<RootState>(
    ({products}) => products,
    shallowEqual
  ) as IProductState
  const dispatch = useDispatch()

  // GetCategory
  // useEffect(() => {
  //     if (params.id) {
  //         getCategory(params.id)
  //             .then((res) => {
  //                 setCategory(res.data.response.data.res)
  //             })
  //             .catch((err) => {
  //                 console.log({ err: err.message })
  //             })
  //     }
  // }, [params.id])

  // Get Hot Deals
  // useEffect(() => {
  //     getAdminSpecialDeals({ deal: 'hot_deal' })
  //         .then((res) => {
  //             sethotProducts(res.data.response.data.res)
  //         })
  //         .catch((err) => {
  //             console.log({ err: err.message })
  //         })
  // }, [])

  // GetAllCategories
  // useEffect(() => {
  //     getAllCategories()
  //         .then((res) => {
  //             setCategories(res.data)
  //         })
  //         .catch((err) => {
  //             console.log({ err })
  //         })
  // }, [])

  const onPageChange = (selectedItem: {selected: number}) => {
    delete filters.total
    filters.pageNo = selectedItem.selected + 1
    dispatch(productRedux.actions.getProducts(filters))
  }
  const onPerPageChange = (newPerPage: number) => {
    delete filters.total
    filters.perPage = newPerPage
    dispatch(productRedux.actions.getProducts(filters))
  }

  return (
    <>
      <Row className=' bg-white pt-6 ps-4 pb-10 mb-10'>
        <Col xs={6} md={3} lg={12}>
          <div>
            <h3>Website User View</h3>
          </div>
        </Col>
      </Row>
    </>
  )
}
export {WebsiteUserView}
