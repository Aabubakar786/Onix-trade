import React, {ChangeEventHandler, FC} from 'react'

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>
  label?: string
  name?: string
  checked?: boolean
  role?: string
  id?: string
  value?: boolean
}
const FormSwitch: FC<Props> = ({value, onChange, label, name, role, id}) => {
  return (
    <div className='form-check form-switch'>
      <input
        name={name}
        className='form-check-input'
        type='checkbox'
        role={role}
        id={id}
        checked={value}
        onChange={onChange}
      />
      <label className='form-check-label' htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default FormSwitch
