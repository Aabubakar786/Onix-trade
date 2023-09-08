import React, {FC} from 'react'
import {FastField} from 'formik'
import moment from 'moment'
import DatePickerComponent from '../datepicker/DatePickerComponent'
import FormikErrorMessage from './FormikErrorMessage'
type Props = {
  name: string
}
type FieldProps = {
  field: {
    value?: Date
  }
  form: {
    setFieldValue: (key: string, value: any) => void
  }
}
const FormikDatePicker: FC<Props> = ({name}) => (
  <>
    <FastField name={name}>
      {({field, form: {setFieldValue}}: FieldProps) => (
        <>
          <DatePickerComponent
            onChange={(value) => setFieldValue(name, value)}
            date={moment(field.value).isValid() ? new Date(field.value as Date) : new Date()}
            toggleClassName='p-0'
          />

          <FormikErrorMessage name={name} />
        </>
      )}
    </FastField>
  </>
)

export default React.memo(FormikDatePicker)
