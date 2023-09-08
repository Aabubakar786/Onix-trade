/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as auth from '../redux/AuthRedux'
import { googleLogin, login } from '../redux/AuthCRUD'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { toast } from 'react-toastify'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: 'muhammadakif2917@gmail.com',
  password: 'Admin@11',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setTimeout(() => {
        // Simulate a successful login response
        const dummyResponse = {
          data: {
            token: 'dummy_api_token',
            user: {
              email: 'dummy@example.com',
              first_name: 'John',
              last_name: 'Doe',
              id: '123',
              image_url: 'https://example.com/dummy-image.jpg',
            },
          },
          message: 'Login successful',
        };
    
        if (dummyResponse.data) {
          const api_token = dummyResponse.data.token;
          const user = dummyResponse.data.user;
          dispatch(auth.actions.login(api_token, {
            email: user.email,
            familyName: user.first_name,
            givenName: user.last_name,
            googleId: user.id,
            imageUrl: user.image_url,
            name: user.first_name + ' ' + user.last_name,
          }));
        } else {
          setSubmitting(false);
          toast.warning(dummyResponse.message);
        }
    
        setLoading(false);
        setStatus('');
      }, 1000);
    },
    
    // onSubmit: (values, { setStatus, setSubmitting }) => {
    //   setLoading(true)
    //   setTimeout(() => {
    //     login(values.email, values.password)
    //       .then(({ data: { response } }: any) => {
    //         if (response?.data) {
    //           const api_token = response.data.token
    //           const user = response.data.user
    //           dispatch(auth.actions.login(api_token, {
    //             email: user.email,
    //             familyName: user.first_name,
    //             givenName: user.last_name,
    //             googleId: user.id,
    //             imageUrl: user.image_url,
    //             name: user.first_name + ' ' + user.last_name,
    //           }))
    //         }
    //         else {
    //           setSubmitting(false)
    //           toast.warning(response?.message)
    //         }
    //         setLoading(false)
    //         setStatus('')
    //       })
    //       .catch(() => {
    //         setLoading(false)
    //         setSubmitting(false)
    //         setStatus('The login credentials are incorrect')
    //       })
    //   }, 1000)
    // },
  })
  const handleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline, ) => {
    setTimeout(() => {
      googleLogin((res as GoogleLoginResponse)?.tokenId as string)
        .then(({ data }) => {
          setLoading(false)
          data ? dispatch(
            auth.actions.login(
              data?.response?.data?.token,
              (res as GoogleLoginResponse)?.profileObj
            )
          ) :
            toast.error('The login credentials are incorrect');
        })
        .catch(() => {
          setLoading(false)
        })
    }, 1000)
  }
  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to ONIX Trading Plateform</h1>
        {/* <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Create an Account
          </Link>
        </div> */}
      </div>
      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            {/* end::Label */}
            {/* begin::Link */}
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{ marginLeft: '5px' }}
            >
              Forgot Password ?
            </Link>
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
        <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div>
        {/* end::Separator */}

        {/* begin::Google link */}
        <GoogleLogin
          clientId='911567849630-g5sus5vghg91bfl6gmkam2lb62lovvck.apps.googleusercontent.com'
          render={(renderProps) => (
            <button
              {...renderProps}
              className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'
            >
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
                className='h-20px me-3'
              />
              Continue with Google
            </button>
          )}
          onSuccess={handleSuccess}
          onFailure={(error) => console.error({ error })}
          cookiePolicy={'single_host_origin'}
        />

        {/* end::Google link */}

        {/*/!* begin::Google link *!/*/}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>*/}
        {/*  <img*/}
        {/*    alt='Logo'*/}
        {/*    src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}*/}
        {/*    className='h-20px me-3'*/}
        {/*  />*/}
        {/*  Continue with Facebook*/}
        {/*</a>*/}
        {/*/!* end::Google link *!/*/}

        {/*/!* begin::Google link *!/*/}
        {/*<a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>*/}
        {/*  <img*/}
        {/*    alt='Logo'*/}
        {/*    src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}*/}
        {/*    className='h-20px me-3'*/}
        {/*  />*/}
        {/*  Continue with Apple*/}
        {/*</a>*/}
        {/*/!* end::Google link *!/*/}
      </div>
      {/* end::Action */}
    </form>
  )
}
