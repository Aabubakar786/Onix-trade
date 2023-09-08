import React, {FC} from 'react'
import {FastField} from 'formik'
import FormikLabel from './FormikLabel'
import FormikErrorMessage from './FormikErrorMessage'

interface ISelectOption {
  label: string
  value: string | number
}
type Props = {
  name: string
  options: ISelectOption[]
  label?: string
  required?: boolean
}
const FormikSelect: FC<Props> = ({name, options, label, required}) => (
  <div className='fv-row mb-10'>
    <FormikLabel label={label} required={required} />

    <FastField as='select' name={name} className='form-select form-select-lg form-select-solid'>
      <option>Select an option</option>
      {options.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </FastField>
    <FormikErrorMessage name={name} />
  </div>
)

export default React.memo(FormikSelect)
