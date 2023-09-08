import React, {ChangeEvent, FC, useState} from 'react'
import FormikLabel from './FormikLabel'
import {useField} from 'formik'
import FormikErrorMessage from './FormikErrorMessage'
import {Button} from 'react-bootstrap'
import Tag from '../tag/Tag'

type Props = {
  name: string
  label?: string
  required?: boolean
}
interface Spec {
  name: string
  value: string
}
const FormikFeatures: FC<Props> = ({name, label, required}) => {
  const [, meta, helpers] = useField(name)
  const {value} = meta
  const {setValue} = helpers
  const [specName, setSpecName] = useState<string>('')
  const [specValue, setSpecValue] = useState<string>('')

  const handleChangeSpecName = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecName(event.target.value)
  }
  const handleChangeSpecValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSpecValue(event.target.value)
  }
  const handleAddSpec = () => {
    if (!!specName && specValue) {
      setValue([...(value || []), {name: specName, value: specValue}])
      setSpecName('')
      setSpecValue('')
    }
  }
  const handleClose = (index: number) => () => {
    setValue(value.filter((v: any, i: number) => i !== index))
  }
  return (
    <div className='fv-row mb-10'>
      <FormikLabel label={label} required={required} />

      <div className='border-container'>
        <div className='d-flex align-items-end'>
          <div className='me-2 flex-grow-1'>
            <FormikLabel label='Specs' required />
            <input
              type='text'
              value={specName}
              onChange={handleChangeSpecName}
              className='form-control form-control-solid'
            />
          </div>
          <div className='me-2 flex-grow-1'>
            <FormikLabel label='Values' required />
            <input
              type='text'
              value={specValue}
              onChange={handleChangeSpecValue}
              className='form-control form-control-solid'
            />
          </div>

          <Button variant='secondary' onClick={handleAddSpec}>
            Add
          </Button>
        </div>
        <div className='d-flex align-items-center flex-wrap mt-3'>
          {(value as Spec[])?.map((spec, index) => (
            <Tag key={`${spec.name}-${spec.value}-${index}`} onClose={handleClose(index)}>
              {spec.name}: {spec.value}
            </Tag>
          ))}
        </div>
      </div>
      <FormikErrorMessage name={name} />
    </div>
  )
}

export default FormikFeatures
