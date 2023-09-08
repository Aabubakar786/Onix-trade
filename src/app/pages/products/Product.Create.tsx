import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import { createProductInits, createProductSchema, ICreateProduct } from './Product.Create.Helper'
import FormikInputField from '../../components/FormikComponents/FormikInputField'
import FormikSelect from '../../components/FormikComponents/FormikSelect'
import FormikPriceTabs from '../../components/FormikComponents/FormikPriceTabs'
import FormikKeywords from '../../components/FormikComponents/FormikKeywords'
import FormikFeatures from '../../components/FormikComponents/FormikFeatures'
import {
  createProduct,
  getAllBrands,
  getProduct,
  updateProduct,
} from '../../modules/products/redux/ProductsCRUD'
import { toast } from 'react-toastify'
import FormikMultiImagesInput from '../../components/FormikComponents/FormikMultiImagesInput'
import { getAdminCategories } from '../../modules/categories/redux/CategoriesCRUD'
import { getAllRetailers } from '../../modules/retailers/redux/RetailersCRUD'
import { AxiosResponse } from 'axios'
import { ICategory, IRetailer } from '../../../setup/interfaces'
import SearchSelect from '../../../_metronic/partials/search/SearchSelect'
import FormikLabel from '../../components/FormikComponents/FormikLabel'
const ProductCreate = () => {
  const params = useParams()
  const navigate = useNavigate()

  // Categories
  const [category, setCategory] = useState<ICategory>()
  const [categories, setCategories] = useState<any>([])
  const [categoriesSearch, setcategoriesSearch] = useState('')
  const [loadingCategories, setloadingCategories] = useState<boolean>(false)
  const runCategorySearch = useRef<any>()

  //Brands
  const [brand, setBrand] = useState<any>()
  const [brands, setBrands] = useState<any>([])
  const [brandsSearch, setBrandsSearch] = useState('')
  const [loadingBrands, setloadingBrands] = useState<boolean>(false)
  const runBrandsSearch = useRef<any>()

  //Retailers
  const [retailer, setRetailer] = useState<IRetailer>()
  const [retailers, setRetailers] = useState<IRetailer[]>([])
  const [retailersSearch, setRetailersSearch] = useState('')
  const [loadingRetailers, setloadingRetailers] = useState<boolean>(false)
  const runRetailersSearch = useRef<any>()
  const [valid, setValid] = useState<boolean>(true)

  //conditions
  const conditions = [
    { label: 'New', value: 'new' },
    { label: 'Used', value: 'used' },
  ]

  //availability
  const availability = [
    { label: 'In Stock', value: 'IN_STOCK' },
    { label: 'Out Of Stock', value: 'OUT_OF_STOCK' },
  ]

  const [initValues, setInitialValue] = useState<ICreateProduct>(createProductInits)
  const [loading, setLoading] = useState<boolean>(false)
  const [hotDeal, addToHotDeal] = useState<boolean>(false)
  useEffect(() => {
    getAdminCategories({})
      .then((response: AxiosResponse) => {
        setCategories(response.data.response.data.data)
      })
      .catch((err) => {
        console.log({ err: err.message })
      })
    getAllBrands()
      .then((response: AxiosResponse) => {
        setBrands(response.data.response.data.data)
        console.log(brands)
      })
      .catch((err) => {
        console.log({ err: err.message })
      })
    getAllRetailers()
      .then((response: AxiosResponse) => {
        setRetailers(response.data.response.data.data)
      })
      .catch((err) => {
        console.log({ err: err.message })
      })
    if (params.id) {
      getProduct(params.id)
        .then((res) => {
          let preValues = res?.data?.response?.data?.searchedItem
          const modifyObj = { ...preValues, price: preValues?.price?.[0]?.amount, images: preValues?.images?.additional_images?.slice(1, 6), short_desc: "" + preValues?.short_desc }
          setBrand(preValues.brand)
          setCategory(preValues.category)
          setRetailer(preValues.retailer)
          setInitialValue(prev => ({ ...prev, ...modifyObj }))
        })
        .catch((err) => {
          console.log({ err: err.message })
        })
    }
  }, [])
  const onSubmit = (values: ICreateProduct) => {
    values.categoryId = category?.id
    values.retailerId = retailer?.id
    values.brand = brand?.id
    const Prices = [
      {
        actualValue: values.price,
        amount: values.price
      }
    ]
    const Category = {
      id: category?.id,
      parent: category?.parent_id
    }
    const Retailer = {
      id: retailer?.id,
      name: retailer?.name
    }
    const sendData = { ...values, price: Prices, category: Category, retailer: Retailer }
    setLoading(true)
    const call = params.id ? updateProduct : createProduct
    call(sendData, params.id)
      .then(({ data }) => {
        setLoading(false)
        if (data?.response?.message) {
          toast.success(`Product ${params.id ? 'updated' : 'created'} successfully!`)
          navigate('/products')
        }
        else {
          throw new Error(`something went wrong`)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Could not ${params.id ? 'update' : 'create'}`)
        console.log({ err: err.message })
      })
  }


  ////////// Search Categories section///////////////
  const fetchSearchedCategories = (text: string) => {
    setloadingCategories(true)
    try {
      clearInterval(runCategorySearch.current)
    } catch (e) { }
    runCategorySearch.current = setInterval(() => {
      getAdminCategories({ q: text })
        .then((response: AxiosResponse) => {
          setCategories(response.data.response?.data?.data || [])
          setloadingCategories(false)
        })
        .catch((err) => {
          console.log({ err })
        })
      clearInterval(runCategorySearch.current)
    }, 3000)
  }

  const onChangeCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setcategoriesSearch(text)
    fetchSearchedCategories(text)
  }

  const filteredCategories = useMemo(
    () =>
      categories?.filter((category: ICategory) =>
        category.name?.toLowerCase().includes(categoriesSearch?.toLowerCase())
      ),
    [categories, categoriesSearch]
  )

  const handleSelectedCategory = (selected: ICategory) => {
    setCategory(selected)
  }

  const categorySelected = useMemo(
    () => categories.find((_category: ICategory) => _category.id === category?.id),
    [category, categories]
  )
  ////////////////////////////////////////////////////

  ////////// Search Brand section///////////////
  const fetchSearchedBrands = (text: string) => {
    setloadingBrands(true)
    try {
      clearInterval(runBrandsSearch.current)
    } catch (e) { }
    runBrandsSearch.current = setInterval(() => {
      getAllBrands()
        .then((response: AxiosResponse) => {
          setBrands(response.data.response?.data?.data || [])
          setloadingBrands(false)
        })
        .catch((err) => {
          console.log({ err })
        })
      clearInterval(runBrandsSearch.current)
    }, 3000)
  }

  const onChangeBrand = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setBrandsSearch(text)
    fetchSearchedBrands(text)
  }

  const filteredBrands = useMemo(
    () =>
      brands?.filter((brand: any) =>
        brand.title?.toLowerCase().includes(brandsSearch?.toLowerCase())
      ),
    [brands, brandsSearch]
  )

  const handleSelectedBrand = (selected: any) => {
    setBrand(selected)
  }

  const brandSelected = useMemo(
    () => brands.find((_brand: any) => _brand.id === brand?.id),
    [brand, brands]
  )
  ////////////////////////////////////////////////////

  ////////// Search Retailers section///////////////
  const fetchSearchedRetailers = (text: string) => {
    setloadingRetailers(true)
    try {
      clearInterval(runRetailersSearch.current)
    } catch (e) { }
    runRetailersSearch.current = setInterval(() => {
      getAllRetailers()
        .then((response: AxiosResponse) => {
          setRetailers(response.data.response?.data?.data || [])
          setloadingRetailers(false)
        })
        .catch((err) => {
          console.log({ err })
        })
      clearInterval(runRetailersSearch.current)
    }, 3000)
  }

  const onChangeRetailer = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value
    setRetailersSearch(text)
    fetchSearchedRetailers(text)
  }

  const filteredRetailers = useMemo(
    () =>
      retailers?.filter((retailer: any) =>
        retailer.name?.toLowerCase().includes(retailersSearch?.toLowerCase())
      ),
    [retailers, retailersSearch]
  )

  const handleSelectedRetailer = (selected: any) => {
    setRetailer(selected)
  }

  const retailerSelected = useMemo(
    () => retailers.find((_brand: any) => _brand.id === retailer?.id),
    [retailer, retailers]
  )
  ////////////////////////////////////////////////////
  const hot = (ev: boolean) => {
    addToHotDeal(ev)
  }

  return (
    <CustomCard
      title={`${params?.id ? 'Edit' : 'Add'} Product`}
      headerClassName='border-0 pt-5'
      toolbar={
        <>
          {/* <span style={{ fontSize: '18px' }} className='bi bi-eye-fill svg-icon-3 me-3'>
          </span> */}

          {(!hotDeal && <Button className='btn btn-outline btn-outline-secondary d-flex align-items-center me-3' size='sm' variant='black' onClick={() => hot(true)}>
            <span style={{ fontSize: '18px' }} className='bi bi-plus'>
            </span>
            <span style={{ fontSize: '14px', verticalAlign: 'text-bottom' }}>
              To Hot Deals
            </span>
          </Button>)}

          {(hotDeal && <Button className='btn btn-secondary d-flex align-items-center' size='sm' variant='black' onClick={() => hot(false)}>
            <span style={{ fontSize: '20px' }} className='bi bi-check text-white' />
            <span style={{ fontSize: '14px', verticalAlign: 'text-bottom', color: "white" }}>
              Added to Hot Deals
            </span>
          </Button>)}
          {/* {(<Button className='btn btn-outline btn-outline-secondary ms-2 me-3' size='sm' variant='black' >
            <span style={{ fontSize: '18px' }} className='bi bi-arrow-counterclockwise me-2'>
            </span>
            <span style={{ fontSize: '14px', verticalAlign: 'text-bottom' }}>
              Restore
            </span>
          </Button>)} */}

          {/* {(<Button className='btn btn-secondary' size='sm' variant='black'>
            <span style={{ fontSize: '16px' }} className='bi bi-trash me-2'>
            </span>
            <span style={{ fontSize: '14px', verticalAlign: 'text-bottom' }}>
              Hard Delete
            </span>
          </Button>)}  */}
        </>

      }
    >
      <Formik
        initialValues={initValues}
        validationSchema={createProductSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, errors }) => (
          <Form id='product-form' onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <FormikInputField name='title' label='Product Title' placeholder='Product Title goes here' required />
                <FormikInputField name='sku' label='Product SKU' placeholder='Product SKU goes here' required />
                <FormikInputField name='id' label='Product ID' placeholder='Product ID goes here' required />
                <FormikInputField name='url' label='Product URL' placeholder='Product URL goes here' required />
                <FormikInputField name='model' label='Product Model' placeholder='Product Model goes here' required />
                <FormikLabel label='Select Brand' required />
                <SearchSelect
                  data={filteredBrands}
                  value={brandsSearch}
                  onChange={onChangeBrand}
                  placeholder={'Select Brand'}
                  displayKey='title'
                  onSelect={handleSelectedBrand}
                  selected={brand ? brand : brandSelected}
                  loading={loadingBrands} />
                {(!brand && !valid) && <div className="text-danger mt-2">Product Brand is a required field</div>}
                <div className='m-10'></div>
                <FormikInputField name='short_desc' label='Short Description' as='textarea' rows={2} required />
                <FormikInputField name='long_desc' label='Long Description' as='textarea' rows={5} required />
                <Row className='mb-5'>
                  <Col xs={12} sm={6}>
                    <FormikLabel label={'Select Category'} required={true} />
                    <SearchSelect
                      data={filteredCategories}
                      value={categoriesSearch}
                      onChange={onChangeCategory}
                      placeholder={'Select Category'}
                      displayKey='name'
                      onSelect={handleSelectedCategory}
                      selected={category ? category : categorySelected}
                      loading={loadingCategories}
                    />
                    {(!category && !valid) && <div className="text-danger mt-2">Product Category is a required field</div>}
                  </Col>
                  <Col xs={12} sm={6}>
                    <FormikLabel label={'Select Retailer'} required={true} />
                    <SearchSelect
                      data={filteredRetailers}
                      value={retailersSearch}
                      onChange={onChangeRetailer}
                      placeholder={'Select Retailer'}
                      displayKey='name'
                      onSelect={handleSelectedRetailer}
                      selected={retailer ? retailer : retailerSelected}
                      loading={loadingRetailers}
                    />
                    {(!retailer && !valid) && <div className="text-danger mt-2">Product Retailer is a required field</div>}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={6}>
                    <FormikSelect
                      name='availability'
                      label='Set Availability'
                      options={availability}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <FormikSelect name='condition' label='Select Condition' options={conditions} />
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <FormikMultiImagesInput
                  name='images'
                  element={'Product'}
                  label='Product Images'
                  noOfImages={5}
                />
                <FormikFeatures name='item_attributes' label='Set Features' />
                <FormikPriceTabs />
                <FormikKeywords name='keywords' label='Enter Keywords' />
              </Col>
            </Row>
            <div>
              <button
                className='btn btn-sm btn-outline btn-outline-secondary me-3'
                disabled={loading}
                onClick={() => navigate('/products')}
                type='button'
              >
                Cancel
              </button>
              <Button size='sm' onClick={() => { (!brand || !category || !retailer) && setValid(false) }} disabled={loading} variant='secondary' type='submit'>
                {loading && <span className='spinner spinner-border spinner-border-sm' />}
                <i className='fa fa-plus text-white' /> <span className='text-white'>{params.id ? "Update" : "New"} Product</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomCard>
  )
}

export default ProductCreate
