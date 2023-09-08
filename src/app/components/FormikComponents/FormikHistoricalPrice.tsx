import React, {ChangeEvent, FC, useState} from 'react'
import {Field} from 'formik'
import {Button} from 'react-bootstrap'
import DatePickerComponent from '../datepicker/DatePickerComponent'
import moment from 'moment'

type Props = {
  name: string
  label?: string
  required?: boolean
}
type FieldProps = {
  field: {
    value?: any[]
  }
  form: {
    setFieldValue: (key: string, value: any) => void
  }
}
const FormikHistoricalPrice: FC<Props> = ({name, label, required}) => {
  const [price, setPrice] = useState<number | string | undefined>('')
  const [date, setDate] = useState<Date | null>(null)
  const [edit, setEdit] = useState<{index: number | null; price: number | string; date: Date}>({
    index: null,
    price: '',
    date: new Date(),
  })
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value))
  }
  const handleChangeDate = (_date: Date) => {
    setDate(_date)
  }
  return (
    <Field name={name}>
      {({field: {value}, form: {setFieldValue}}: FieldProps) => (
        <div>
          {value?.map((option, index) => (
            <div className='d-flex align-items-center mb-3' key={index}>
              <div className='form-control form-control-solid d-flex align-items-center justify-content-between'>
                {edit.index === index ? (
                  <>
                    <input
                      type='number'
                      value={edit.price}
                      placeholder='Enter Price Here'
                      onChange={(event) =>
                        setEdit((prevState) => ({...prevState, price: event.target.value}))
                      }
                      className='form-control border-0 bg-transparent p-0 me-3'
                    />

                    <DatePickerComponent
                      onChange={(_date) => setEdit((prevState) => ({...prevState, date: _date}))}
                      date={edit.date}
                      toggleClassName='p-0'
                    >
                      {edit.date ? (
                        <span className='text-nowrap cursor-pointer'>
                          {moment(edit.date).format('MMM D-YYYY')}
                        </span>
                      ) : (
                        <i className='fa fa-calendar' />
                      )}
                    </DatePickerComponent>
                  </>
                ) : (
                  <>
                    <span className='flex-grow-1 me-3'>{option.price}</span>
                    <span className='text-nowrap'>{moment(option.date).format('MMM D-YYYY')}</span>
                  </>
                )}
              </div>
              {edit.index === index ? (
                <Button
                  variant='light'
                  className='btn-icon ms-3'
                  size='sm'
                  onClick={() => {
                    if (edit.price && edit.date) {
                      setFieldValue(
                        name,
                        value.map((v, i) =>
                          i === edit.index ? {price: edit.price, date: edit.date} : v
                        )
                      )
                      setEdit({index: null, price: '', date: new Date()})
                    }
                  }}
                >
                  <i className='fa fa-plus' />
                </Button>
              ) : (
                <Button
                  variant='light'
                  onClick={() => setEdit({index, price: option.price, date: option.date})}
                  className='btn-icon ms-3'
                  size='sm'
                >
                  <i className='fa fa-pencil-alt' />
                </Button>
              )}
            </div>
          ))}
          <div className='d-flex align-items-center'>
            <div className='form-control form-control-solid d-flex align-items-center justify-content-between'>
              <input
                type='number'
                value={price}
                placeholder='Enter Price Here'
                onChange={handleChange}
                className='form-control border-0 bg-transparent p-0 me-3'
              />

              <DatePickerComponent
                onChange={handleChangeDate}
                date={date || new Date()}
                toggleClassName='p-0'
              >
                {date ? (
                  <span className='text-nowrap cursor-pointer'>
                    {moment(date).format('MMM D-YYYY')}
                  </span>
                ) : (
                  <i className='fa fa-calendar' />
                )}
              </DatePickerComponent>
            </div>
            <Button
              variant='light'
              className='btn-icon ms-3'
              size='sm'
              onClick={() => {
                if (price && date) {
                  setFieldValue(name, value ? [...value, {price, date}] : [{price, date}])
                  setPrice('')
                  setDate(null)
                }
              }}
            >
              <i className='fa fa-plus' />
            </Button>
          </div>
        </div>
      )}
    </Field>
  )
}

export default React.memo(FormikHistoricalPrice)
