import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import {
  createCategoryInits,
  createCategorySchema,
  ICreateCategory,
} from './Categories.Create.Helper'
import FormikInputField from '../../components/FormikComponents/FormikInputField'
import {
  createCategory,
  getAdminCategories,
  getCategory,
  updateCategory,
} from '../../modules/categories/redux/CategoriesCRUD'
import { AxiosResponse } from 'axios'
import FormikKeywords from '../../components/FormikComponents/FormikKeywords'
import FormikMultiImagesInput from '../../components/FormikComponents/FormikMultiImagesInput'
import { toast } from 'react-toastify'
import FormikLabel from '../../components/FormikComponents/FormikLabel'
import SearchSelect from '../../../_metronic/partials/search/SearchSelect'
import { ICategory } from '../../../setup/interfaces'
import FormikSingleImageInput from '../../components/FormikComponents/FormikSingleImageInput'

const CategoriesCreate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [viewImageUpload, setViewImageUpload] = useState<boolean>(false)
  const [initValues, setInitialValue] = useState<any>(createCategoryInits)
  const [categories, setCategories] = useState<any>([])
  const [category, setCategory] = useState<ICategory>()
  const [loading, setLoading] = useState<boolean>(false)
  const [categoriesSearch, setcategoriesSearch] = useState('')
  const [loadingCategories, setloadingCategories] = useState<boolean>(false)
  const runSearch = useRef<any>()

  useEffect(() => {
    //get category against id
    if (params.id) {
      getCategory(params.id)
        .then((resp) => {
          const response = resp?.data?.response?.data?.res
          if (response?.image === 'undefined') {
            setViewImageUpload(true)
          }
          setInitialValue(response)
          getCategory(response?.parent_id).then((res) => {
            if(res?.data?.response?.data?.res){
              setCategory(res.data.response.data.res)
            }
            else{
              throw new Error(`something went wrong`) 
            }
          })
          .catch((err) => {
            toast.error(`Category details not found!`)
          })
        })
        .catch((err) => {
          toast.error(`something went wrong!`)
        })
    } else {
      setViewImageUpload(true)
    }
  }, [params.id])
  useEffect(() => {
    fetchSearchedCategories('')
  }, [])

  ////////// Search Categories section///////////////
  const fetchSearchedCategories = (text: string) => {
    setloadingCategories(true)
    try {
      clearInterval(runSearch.current)
    } catch (e) { }
    runSearch.current = setInterval(() => {
      getAdminCategories({ q: text })
        .then((response: AxiosResponse) => {
          setCategories(response.data.response?.data?.data || [])
          setloadingCategories(false)
        })
        .catch((err) => {
          toast.error(`Categories not found!`)
        })
      clearInterval(runSearch.current)
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

  // Form Submittion code
  const onSubmit = (values: ICreateCategory) => {
    values.parent_id = category?.id || 0
    setLoading(true)
    const call = params.id ? updateCategory : createCategory
    call(values, params.id)
      .then(() => {
        setLoading(false)
        toast.success(`Category ${params.id ? 'updated' : 'created'} successfully!`)
        navigate('/categories')
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Could not ${params.id ? 'update' : 'create'}`)
        console.log({ err: err.message })
      })
  }
  ///////////////////////

  const onImageClick = () => {
    setViewImageUpload(true)
    initValues.image = ''
  }
  const imgDivstyles = {
    width: '100%',
    height: '200px',
    'text-align': 'center',
  }
  const imgStyles = {
    width: '50%',
  }
  return (
    <CustomCard
      title={`${params?.id ? 'Edit' : 'Add'} Category Here`}
      headerClassName='border-0 pt-5'
    >
      {
        <Formik
          disabled={!category?.id}
          enableReinitialize={true}
          validationSchema={createCategorySchema}
          initialValues={initValues}
          onSubmit={onSubmit}
        >
          {() => (
            <Form id='category-form'>
              <Row>
                <Col xs={12} md={6}>
                  <FormikInputField
                    name='name'
                    label='Category Name'
                    required
                    placeholder='Category name goes here'
                  />
                  <FormikLabel label='Select Parent Category' />
                  <SearchSelect
                    data={filteredCategories}
                    value={categoriesSearch}
                    onChange={onChangeCategory}
                    placeholder={'Select Category'}
                    displayKey='name'
                    onSelect={handleSelectedCategory}
                    selected={category || categorySelected}
                    loading={loadingCategories} />
                  <div className='mt-10'></div>
                  <FormikInputField
                    name='description'
                    label='Description'
                    required
                    as='textarea'
                    rows={5}
                    placeholder='Description of category goes here'
                  />
                  {/* <FormikKeywords name='keywords' label='Enter Keywords' /> */}
                </Col>
                {(viewImageUpload && <Col xs={12} md={6}>
                  <FormikMultiImagesInput name='imageArray' element={'Category'} label='Category Image' noOfImages={1} />
                </Col>)}

                {(!viewImageUpload && <Col xs={12} md={6}>
                  <FormikLabel label='Category Image' />
                  <div className='col-12' style={imgDivstyles}>
                    <img style={imgStyles} onClick={onImageClick} src={initValues?.image} alt="abcccc"></img>
                  </div>
                </Col>)}
              </Row>
              <div>
                <button
                  className='btn btn-sm btn-outline btn-outline-secondary me-3'
                  disabled={loading}
                  onClick={() => navigate('/categories')}
                  type='button'
                >
                  Cancel
                </button>
                <Button size='sm' disabled={loading} variant='secondary' type='submit'>
                  {loading && <span className='spinner spinner-border spinner-border-sm' />}
                  <i className='fa fa-plus text-white' /> <span className='text-white'>{params.id ? 'Update' : 'Create'} Category</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
    </CustomCard>
  )
}

export default CategoriesCreate
// return !category?.id ?
// (
//   <>
//     <div className=' d-flex justify-content-center'>
//       <div className="spinner-grow" role="status">
//       </div>
//     </div></>
// ) : (
