import React, {FC} from 'react'
import {ErrorMessage} from 'formik'

type Props = {
  name: string
}
const FormikErrorMessage: FC<Props> = ({name}) => {
  return (
    <div className='text-danger mt-2'>
      <ErrorMessage name={name} />
    </div>
  )
}

export default FormikErrorMessage
