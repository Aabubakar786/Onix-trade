import React, {useEffect, useState, useCallback} from 'react'
import CustomCard from '../../../_metronic/partials/widgets/card/CustomCard'
import {MdEdit} from 'react-icons/md'
import {useNavigate, useParams} from 'react-router-dom'
import {Button, Col, Row} from 'react-bootstrap'
import {Form, Formik} from 'formik'
import {createUserInits, createUserSchema, IEditUser} from './WebsiteUsers.Create.Helper'
import FormikInputField from '../../components/FormikComponents/FormikInputField'
import {getUser, updateUser} from '../../modules/websiteUsers/redux/WebsiteUsersCRUD'
import {AxiosResponse} from 'axios'
import FormikMultiImagesInput from '../../components/FormikComponents/FormikMultiImagesInput'
import {toast} from 'react-toastify'
import FormikLabel from '../../components/FormikComponents/FormikLabel'
import {IUser} from '../../../setup/interfaces'
import FormSwitch from '../../../_metronic/partials/FormSwitch'
import {useDropzone} from 'react-dropzone'
import clsx from 'clsx'
import WebsiteUserSuspend from '../../modules/websiteUsers/WebsiteUser.Suspend'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
const WebsiteUserCreate = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [viewImageUpload, setViewImageUpload] = useState<boolean>(false)
  const [initValues, setInitialValue] = useState<any>(createUserInits)
  const [user, setUser] = useState<IUser>()
  const [loading, setLoading] = useState<boolean>(false)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    //get category against id
    if (params.id) {
      getUser(params.id)
        .then((resp) => {
          const response = resp.data.response.data.res
          if (response.image === 'undefined') {
            setViewImageUpload(true)
          }
          setInitialValue(response)
          // getUser(resp.data.response.data.res.parent_id).then((res) => {
          //   setUser(res.data.response.data.res)
          // })
        })
        .catch((err) => {
          console.log({err: err.message})
        })
    } else {
      setViewImageUpload(true)
    }
  }, [params.id])

  // Form Submittion code
  const onSubmit = (values: IEditUser) => {
    values.price_alert = toggle
    values.image = initValues.image
    setLoading(true)
    const call = updateUser
    call(values, params.id)
      .then(() => {
        setLoading(false)
        toast.success(`User updated successfully!`)
        navigate('/users')
      })
      .catch((err) => {
        setLoading(false)
        toast.error(`Could not update`)
        console.log({err: err.message})
      })
  }
  ///////////////////////

  const onImageClick = () => {
    setViewImageUpload(true)
    // initValues.image = ''
  }
  const imgDivstyles = {
    width: '100px',
    height: '100px',
    'text-align': 'center',
  }
  const imgStyles = {
    width: '100px',
    height: '100px',
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }
  const onDrop = useCallback((acceptedFiles) => {
    setInitialValue({...initValues, image: acceptedFiles})
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <CustomCard
      title={`Edit Website User Here`}
      headerClassName='border-0 pt-5'
      toolbar={
        <span className='d-flex align-items-stretch'>
          <div className={clsx('d-flex align-items-stretch h-35px')}>
            <WebsiteUserSuspend edit='edit' id={JSON.stringify(params.id)} />
          </div>
        </span>
      }
    >
      <hr />
      {
        <Formik
          // disabled={!user?.id}
          enableReinitialize={true}
          validationSchema={createUserSchema}
          initialValues={initValues}
          onSubmit={onSubmit}
        >
          {({values}) => (
            <Form id='category-form'>
              <Row>
                <Col xs={12} md={7}>
                  <Col xs={12} md={6}>
                    <FormikLabel label='Upload Avatar' />
                    <div className='imageCont'>
                      <div className='col-12' style={imgDivstyles}>
                        {!initValues.image ? (
                          <img style={imgStyles} src={'/media/logos/defCategory.png'} alt='abcccc'></img>
                        ) : (
                          initValues.image.map((value: any) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              {isDragActive ? (
                                <p>Drop the files here ...</p>
                              ) : (
                                <img
                                  style={imgStyles}
                                  onClick={onImageClick}
                                  src={URL.createObjectURL(new File(initValues.image, value))}
                                  alt='abc'
                                />
                              )}
                            </div>
                          ))
                        )}
                      </div>
                      <div className='btnImg'>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          {isDragActive ? (
                            <p>Drop the files here ...</p>
                          ) : (
                            <MdEdit color='#fff' size='18px' onClick={onImageClick} />
                          )}
                        </div>
                      </div>
                    </div>
                    <br />
                  </Col>
                  <FormikInputField
                    name='first_name'
                    label='First Name'
                    required
                    placeholder='First name goes here'
                  />
                  <FormikInputField
                    name='last_name'
                    label='Last Name'
                    required
                    placeholder='Last name goes here'
                  />
                  <FormikInputField
                    name='email'
                    label='Email'
                    required
                    placeholder='Email goes here'
                  />
                  <FormikInputField
                    name='phone_number'
                    label='Phone Number'
                    placeholder='Phone Number goes here'
                  />
                  {/* <FormikKeywords name='keywords' label='Enter Keywords' required /> */}
                </Col>

                <Col xs={12} md={5}>
                  <FormikInputField
                    name='bio'
                    label='Bio'
                    as='textarea'
                    rows={5}
                    placeholder='Bio of user goes here'
                  />

                  <div className='border-container'>
                    <Row>
                      <Col lg={6}>
                        <FormikLabel label='Price alert' required />
                      </Col>
                      <Col lg={6}>
                        <FormSwitch
                          name='price_alert'
                          role='switch'
                          onChange={handleToggle}
                          value={toggle}
                          label={toggle ? 'Enabled' : 'Disabled'}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col lg={6}>
                        <FormikLabel label='Logged in date' />
                      </Col>
                      <Col lg={6}>
                        <div className='d-flex align-items-end'>
                          <p className='text-primary'>22/09/2021</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
              <div>
                <button
                  className='btn btn-sm btn-outline btn-outline-secondary me-3'
                  disabled={loading}
                  onClick={() => navigate('/users')}
                  type='button'
                >
                  Cancel
                </button>
                <Button size='sm' disabled={loading} variant='secondary' type='submit'>
                  {loading && <span className='spinner spinner-border spinner-border-sm' />}
                  <i className='fa fa-plus text-white' /> <span className='text-white'>{params.id ? 'Update' : 'Create'} User</span>
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
    </CustomCard>
  )
}

export default WebsiteUserCreate
