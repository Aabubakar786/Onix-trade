import React, {FC, useMemo} from 'react'
import FormikLabel from './FormikLabel'
import {useField} from 'formik'
import FormikErrorMessage from './FormikErrorMessage'
import ImageInput from '../dropzone/ImageInput'

type Props = {
  name: string
  label?: string
  required?: boolean
  noOfImages: number | 5
  element: string | 'Item'
}
const FormikSingleImageInput: FC<Props> = ({name, label, required, noOfImages, element}) => {
  const [, meta, helpers] = useField(name)
  const {value} = meta
  const {setValue} = helpers
  const handleChange = (images: File[]) => {
    setValue([...images])
  }
  const images = useMemo(() => {
    let imgs: File[] = []
    if (value?.length) {
      imgs = [...value]
    }
    const placeholder = new Array(noOfImages - imgs.length)
    imgs = [...imgs, ...placeholder]
    return imgs
  }, [value, noOfImages])
  return (
    <div className='fv-row mb-10'>
      <FormikLabel label={label} required={required} />
      <div className='row ' style={{rowGap: 16}}>
        {images?.map((img: any, index: number) => (
          <div className={`col-${index < 2 ? '6' : 4} ${noOfImages === 1 ? 'col-12' : ''}`}>
            <ImageInput element={element} value={img} multiple={false} onChange={handleChange} />
          </div>
        ))}
      </div>

      <FormikErrorMessage name={name} />
    </div>
  )
}

export default FormikSingleImageInput
