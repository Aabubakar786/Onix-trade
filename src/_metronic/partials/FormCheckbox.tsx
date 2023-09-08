import React, {ChangeEventHandler, FC} from 'react'

type Props = {
  value?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  name?: string
  checked?: boolean
  role?: string
}
const FormCheckbox: FC<Props> = ({value, onChange, label, name, role}) => {
  return (
    <label className='form-check form-switch form-check-sm form-check-custom form-check-solid mb-3'>
      <input
        className='form-check-input'
        name={name}
        type='checkbox'
        role={role}
        checked={value}
        onChange={onChange}
      />
      <span className='form-check-label'>{label}</span>
    </label>
  )
}

export default FormCheckbox
