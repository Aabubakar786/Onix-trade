import React, { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

type Props = {
  onChange?: any
  multiple?: boolean
  disabled?: boolean
  maxSize?: number
  maxFiles?: number
  value?:  string
  // value?:  File
  index?: number
  element: string | 'Product'
}
const ImageInput: FC<Props> = ({
  value,
  onChange,
  multiple = false,
  disabled,
  maxSize,
  maxFiles,
  element,
  index
}) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange?.(acceptedFiles, index)
    },
    [onChange]
  )
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple,
    disabled,
    maxSize,
    maxFiles,
  })
  return (
    <div {...getRootProps()} className={`product-image-${value ? 'preview' : 'input'}`}>
      <input {...getInputProps()} />
      {value ? (
        // <img src={value.includes("https") ? value : URL.createObjectURL(value)} alt='' />
        <img src={value} alt='' />
      ) : (
        <>
          <i className='bi bi-images icon mb-5' />
          <p className='fs-7 mb-0'>Add {element} Image Here</p>
          <p className='fs-9'>
            <strong>Browse</strong> an image
          </p>
        </>
      )}
    </div>
  )
}

export default ImageInput
