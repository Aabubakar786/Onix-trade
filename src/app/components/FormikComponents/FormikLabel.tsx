import React, {FC} from 'react'

type Props = {
  label?: string
  required?: boolean
}
const FormikLabel: FC<Props> = ({required, label}) => {
  return label ? (
    <label className={`form-label text-dark ${required ? 'required' : ''}`}>{label}</label>
  ) : null
}

export default FormikLabel
