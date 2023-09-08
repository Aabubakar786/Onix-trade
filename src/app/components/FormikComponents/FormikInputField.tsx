import React, {FC} from 'react'
import {FastField} from 'formik'
import FormikLabel from './FormikLabel'
import FormikErrorMessage from './FormikErrorMessage'
import {SwitchProps} from '@mui/material'

type Props = {
  name: string
  placeholder?: string
  label?: string
  required?: boolean
  as?: string
  type?: string
  rows?: number
}
const FormikInputField: FC<Props> = ({name, placeholder, type, label, rows, required, as}) => (
  <div className='fv-row mb-10'>
    <FormikLabel label={label} required={required} />
    <FastField
      name={name}
      placeholder={placeholder}
      as={as}
      type={type}
      rows={rows}
      className='form-control form-control-lg  form-control-solid'
    />
    <FormikErrorMessage name={name} />
  </div>
)

export default React.memo(FormikInputField)
