import React, { useEffect, useState } from 'react'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { Form, Formik } from 'formik'
import { createRetailerInits, createRetailerSchema, ICreateRetailer } from './Retailers.Create.Helper'
import FormikInputField from '../../components/FormikComponents/FormikInputField'
import { toast } from 'react-toastify'
import FormikMultiImagesInput from '../../components/FormikComponents/FormikMultiImagesInput'
import { createRetailer, getRetailer, updateRetailer } from '../../modules/retailers/redux/RetailersCRUD'
import FormikLabel from '../../components/FormikComponents/FormikLabel'

const RetailersCreate = () => {

  const params = useParams()
  const navigate = useNavigate()
  const [initValues, setInitialValue] = useState<ICreateRetailer>(createRetailerInits)
  const [loading, setLoading] = useState<boolean>(false)
  const [viewImageUpload, setViewImageUpload] = useState<boolean>(false)

  useEffect(() => {
    //get category against id
    if (params.id) {
      getRetailer(params.id)
        .then((res) => {
          if (res.data.response.data.res.logo === 'undefined') {
            setViewImageUpload(true);
          }
          setInitialValue(res.data.response.data.res)
        })
        .catch((err) => {
          console.log({ err: err.message })
        })
    } else {
      setViewImageUpload(true);
    }
  }, [params.id])
  const onSubmit = (values: ICreateRetailer) => {
    setLoading(true)
    const call = params.id ? updateRetailer : createRetailer
    call(values, params.id)
      .then(() => {
        setLoading(false)
        toast.success(`Retailer ${params.id ? 'updated' : 'created'} successfully!`)
        navigate('/retailers')
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Could not ${params.id ? 'update' : 'create'}`)
        console.log({ err: err.message })
      })
  }
  const onImageClick = () => {
    setViewImageUpload(true)
    initValues.image = '';
  }
  const imgDivstyles = {
    width: '100%',
    'text-align': 'center'
  };
  const imgStyles = {
    'width': '50%',
    'aspect-ratio': '1/1',
    'object-fit': 'contain',
    'border-radius': '10px',
    'border-style': 'dotted',
    'border-color': 'gray',
    'vertical-align': 'top'
  }
  return (
    <CustomCard
      title={`${params?.id ? 'Edit' : 'Add'} Retailer`}
      headerClassName='border-0 pt-5'
    >
      <Formik
        validationSchema={createRetailerSchema}
        initialValues={initValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        {() => (
          <Form id='product-form'>
            <Row>
              <Col xs={12} md={6}>
                <FormikInputField
                  name='name'
                  label='Retailer Name'
                  required
                  placeholder='Retailer name goes here'
                />
                <FormikInputField
                  name='description'
                  label='Description'
                  required
                  as='textarea'
                  rows={5}
                />
              </Col>
              {(viewImageUpload && <Col xs={12} md={6}>
                <FormikMultiImagesInput name='imageArray' element={'Retailer'} label='Retailer Image' noOfImages={1} />
              </Col>)}

              {(!viewImageUpload && <Col xs={12} md={6}>
                <FormikLabel label='Retailer Image' />
                <div className='col-12' style={imgDivstyles}>
                  {(initValues.logo && <img style={imgStyles} onClick={onImageClick} src={initValues.logo} alt="Retailer Logo"></img>)}
                </div>
              </Col>)}
            </Row>
            <div>
              <button
                className='btn btn-sm btn-outline btn-outline-secondary me-3'
                disabled={loading}
                type='button'
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <Button size='sm' disabled={loading} variant='secondary' type='submit'>
                {loading && <span className='spinner spinner-border spinner-border-sm' />}
                <i className='fa fa-plus text-white' /><span className='text-white'>{params?.id ? 'Update' : 'Create'} Retailer</span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomCard>
  )
}

export default RetailersCreate
