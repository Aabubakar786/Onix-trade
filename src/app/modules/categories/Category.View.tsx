import { right } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { RootState } from '../../../setup'
import { ChartsWidget3} from '../../../_metronic/partials/widgets'
import { IProductState } from '../products/redux/ProductRedux'
import { getAllCategories, getCategory } from './redux/CategoriesCRUD'
import * as productRedux from '../products/redux/ProductRedux'
import { ICategory, IProduct } from '../../../setup/interfaces'
import clsx from 'clsx'
import { numberFormatter } from '../../../setup/utils'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import ProductTableSkeleton from '../../skeletons/ProductTableSkeleton'
import PaginationPerPage from '../PaginationPerPage'
import ProductDelete from '../products/Product.Delete'
import ProductsFilters from '../products/Products.Filters'
import ProductsSearch from '../products/Products.Search'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { getAdminSpecialDeals } from '../products/redux/ProductsCRUD'

const CategoryView: React.FC = () => {
    const params = useParams()
    const [categories, setCategories] = useState<ICategory[]>([])
    const [hotProducts, sethotProducts] = useState<IProduct[]>([])
    const [category, setCategory] = useState<any>()
    const { products, filters, loading } = useSelector<RootState>(
        ({ products }) => products,
        shallowEqual
    ) as IProductState
    const dispatch = useDispatch()

    // GetCategory
    useEffect(() => {
        if (params.id) {
            getCategory(params.id)
                .then((res) => {
                    setCategory(res.data.response.data.res)
                })
                .catch((err) => {
                    console.log({ err: err.message })
                })
        }
    }, [params.id])

    // Get Hot Deals
    useEffect(() => {
        getAdminSpecialDeals({ deal: 'hot_deal' })
            .then((res) => {
                sethotProducts(res.data.response.data.res)
            })
            .catch((err) => {
                console.log({ err: err.message })
            })
    }, [])

    // GetAllCategories
    useEffect(() => {
        getAllCategories()
            .then((res) => {
                setCategories(res.data)
            })
            .catch((err) => {
                console.log({ err })
            })
    }, [])

    const onPageChange = (selectedItem: {selected: number}) => {
        delete filters.total;
        filters.pageNo= selectedItem.selected + 1;
        dispatch(
          productRedux.actions.getProducts(filters)
        )
      }
      const onPerPageChange = (newPerPage: number) => {
        delete filters.total;
        filters.perPage=newPerPage;
        dispatch(productRedux.actions.getProducts(filters))
      }
    
    return (
        <>
            <Row className=' bg-white pt-6 ps-4 pb-10 mb-10'>
                <Col xs={6} md={3}>
                    <div className='image-input  mb-5'>
                        <img
                            alt=''
                            src={category?.image || toAbsoluteUrl('/media/logos/defCategory.png')}
                            className='mw-100'
                            onError={(e: any) => {
                                e.target.onerror = null
                                e.target.src = toAbsoluteUrl('/media/logos/defCategory.png')
                            }}
                        />
                        {/* <div className='image-input-wrapper w-250px h-200px'
                            style={{ backgroundImage:  `url('${toAbsoluteUrl(category?.image)}')` || `url('${'/media/logos/defCategory.png'}')`  }}
                        ></div> */}
                    </div>
                    <div className='position-relative w-250px mb-2'>
                        <div className='position-absolute h-30px w-3px bg-secondary rounded top-0 start-0'></div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <h6 className='pt-3' style={{ fontSize: '11px' }}>Parent Category
                                <label className='pe-4' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.parent_id}</label>
                            </h6>
                        </div>
                    </div>
                    <div className='position-relative w-250px mb-2'>
                        <div className='position-absolute h-30px w-3px bg-secondary rounded top-0 start-0'></div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <h6 className='pt-3' style={{ fontSize: '11px' }}>Category ID
                                <label className='pe-4' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.id}</label>
                            </h6>
                        </div>
                    </div>
                    <div className='position-relative w-250px mb-2'>
                        <div className='position-absolute w-3px bg-secondary rounded top-0 start-0' style={{ height: '120px' }}></div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <h6 className='pt-3' style={{ fontSize: '11px' }}>Total Product
                                <label className='pe-4' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.count || 0}</label>
                            </h6>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2 opacity-50'>
                                Live
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.count || 0}</label>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2 '>
                                Draft
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.count || 0}</label>
                        </div>
                        <div className='fw-bolder ps-6  h-30px br-5' style={{ backgroundColor: '#FBFBFB' }}>
                            <span className='badge badge-light-primary fw-bolder px-5 py-2' style={{ color: '#5186ED' }}>
                                Suspended
                            </span>
                            <label className='pe-4 pt-2' style={{ float: right, fontWeight: 400, color: '#8E8E8E', fontSize: '11px' }}>{category?.count || 0}</label>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={9}>
                    <div className='card-title'>
                        <h2>
                            {category?.name}
                        </h2>
                    </div>
                    <div className='text-muted fs-7 pe-20 mb-10'>
                        {category?.description}
                    </div>
                    <ChartsWidget3 className={'card text-dark'} ></ChartsWidget3>

                </Col>
            </Row>
            <Row>
                <CustomCard
                    title='Hot Listed Product'
                    subtitle={`${numberFormatter.format(filters.total || 0)} Products Added Recently`}
                    headerClassName='border-0 pt-5'
                    toolbar={<>
                        <ProductsFilters />
                        <div className={clsx('d-flex align-items-stretch')}>
                            <ProductsSearch />
                        </div>
                    </>}
                >
                    <div className='table-responsive'>
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
                                    products.map((product: IProduct) => (
                                        <tr key={product.id}>
                                            <td>
                                                <div className='d-flex align-items-center'>
                                                    <div className='symbol symbol-45px me-5'>
                                                        <img src={product.images?.additional_images[0]} alt={product.title} />
                                                    </div>
                                                    <div className='d-flex justify-content-start flex-column'>
                                                        <span className='text-dark fw-bolder text-hover-primary fs-6 w-150px text-truncate'>
                                                            {product.title}
                                                        </span>
                                                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                                                            {product.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className='badge badge-light-primary fw-bolder px-4 py-3'>
                                                    {product.availability?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
                                                <span className='text-muted fw-bold text-muted '>
                                                    {categories?.find(
                                                        (category: ICategory) => category.id === product.categoryId
                                                    )?.name}
                                                </span>
                                            </td>
                                            <td>
                                                <div className='d-flex justify-content-end flex-shrink-0'>
                                                    <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                                        <i className='bi bi-eye-fill svg-icon-3' />
                                                    </button>
                                                    <Link
                                                        to={`/products/edit/${product.id}`}
                                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                                    >
                                                        <i className='bi bi-pencil-fill svg-icon-3' />
                                                    </Link>
                                                    <ProductDelete id={product.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* start: pagination */}
                    <PaginationPerPage
                        perPage={filters.perPage || 10}
                        pageNo={filters.pageNo || 1}
                        onPerPageChange={onPerPageChange}
                        onPageChange={onPageChange}
                        totalCount={filters.total || 0}
                        dataLength={products.length || 0}
                    />
                    {/* end: pagination */}
                </CustomCard>
            </Row>
        </>

    )
}
export { CategoryView }
