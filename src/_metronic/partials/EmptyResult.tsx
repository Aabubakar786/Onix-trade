import React, {FC} from 'react'
import {KTSVG} from '../helpers'

type Props = {
  searchText?: string
}
const EmptyResult: FC<Props> = ({searchText}) => {
  return (
    <div className='text-center'>
      <div className='pt-10 pb-10'>
        <KTSVG path='/media/icons/duotune/files/fil024.svg' className='svg-icon-4x opacity-50' />
      </div>

      <div className='pb-15 fw-bold'>
        {searchText && searchText?.length > 0 && (
          <h3 className='text-gray-600 fs-5 mb-2'>No result found</h3>
        )}
        <div className='text-muted fs-7'>
          Please {!searchText?.length ? 'type for search' : 'try again with a different query'}{' '}
        </div>
      </div>
    </div>
  )
}

export default EmptyResult
