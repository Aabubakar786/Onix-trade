import React, {ChangeEvent, FC, KeyboardEventHandler, useState} from 'react'
import FormikLabel from './FormikLabel'
import {useField} from 'formik'
import FormikErrorMessage from './FormikErrorMessage'
import {Badge, Button} from 'react-bootstrap'
import Tag from '../tag/Tag'

type Props = {
  name: string
  label?: string
  required?: boolean
}
const FormikKeywords: FC<Props> = ({name, label, required}) => {
  const [, meta, helpers] = useField(name)
  const {value} = meta
  const {setValue} = helpers
  const [tempKeywords, setTempKeywords] = useState<string[]>([])
  const [keywordText, setKeywordText] = useState<string>('')
  const handleEnter: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      setTempKeywords((prevState) => [...prevState, (event.target as HTMLInputElement).value])
      setKeywordText('')
    }
    if (event.code === 'Backspace' && (event.target as HTMLInputElement).value === '') {
      setTempKeywords((prevState) => prevState.slice(0, prevState.length - 1))
    }
  }
  const handleChangeKeywordText = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywordText(event.target.value)
  }
  const handleAddKeywords = () => {
    setValue([...(value || []), ...tempKeywords])
    setTempKeywords([])
  }
  const handleClose = (index: number) => () => {
    setValue(value.filter((v: any, i: number) => i !== index))
  }
  return (
    <div className='fv-row mb-10'>
      <FormikLabel label={label} required={required} />
      <div className='border-container'>
        <div className='d-flex align-items-center'>
          <div className='form-control form-control-solid me-3 d-flex align-items-center flex-wrap'>
            <div className='d-flex align-items-center '>
              {tempKeywords.slice(0, 2).map((keyword, index) => (
                <Badge className='bg-grey me-2' key={`${keyword}-${index}`}>
                  {keyword}
                </Badge>
              ))}
              {tempKeywords.length > 2 && (
                <Badge className='bg-grey me-2'>+{tempKeywords.length - 2}</Badge>
              )}
            </div>
            <input
              type='text'
              value={keywordText}
              onChange={handleChangeKeywordText}
              className='form-control form-control-transparent p-0 w-auto'
              onKeyDown={handleEnter}
            />
          </div>
          <Button variant='secondary' type='button' className='btn-icon' onClick={handleAddKeywords}>
            <i className='fa fa-plus' />
          </Button>
        </div>
        <div className='d-flex align-items-center flex-wrap mt-3'>
          {(value as string[])?.map((keyword, index) => (
            <Tag key={`${keyword}-${index}`} onClose={handleClose(index)}>
              {keyword}
            </Tag>
          ))}
        </div>
      </div>
      <FormikErrorMessage name={name} />
    </div>
  )
}

export default FormikKeywords
