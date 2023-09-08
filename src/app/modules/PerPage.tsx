import React, {FC} from 'react'
import CustomMenu from '../../_metronic/partials/menu/CustomMenu'

type Props = {
  perPage: number
  onPerPageChange: (perPage: number) => void
  pageNo: number
  totalCount: number
  dataLength:number
}
const PerPage: FC<Props> = ({perPage, onPerPageChange, pageNo, totalCount,dataLength}) => (
  <div className='fs-6 fw-bold text-gray-700 d-flex align-items-center'>
    <CustomMenu
      menuToggle={
        <span className='d-flex align-items-center'>
          <span className='me-3'>{perPage}</span>
          <i className='fa fa-angle-down' />
        </span>
      }
      menuBody={
        <div className='menu-item px-3'>
          <a onClick={() => onPerPageChange(10)} className='menu-link px-5'>
            10
          </a>
          <a onClick={() => onPerPageChange(20)} className='menu-link px-5'>
            20
          </a>
          <a onClick={() => onPerPageChange(50)} className='menu-link px-5'>
            50
          </a>
          <a onClick={() => onPerPageChange(100)} className='menu-link px-5'>
            100
          </a>
        </div>
      }
      toggleClassName='border  paginationBtn'
      menuWidth='w-150px'
    />

    <span className='text ms-2'>
      Showing {pageNo * perPage - perPage + 1} to{' '}
      {/* { pageNo * perPage > totalCount ? dataLength : pageNo * perPage} */}
      {dataLength}  {' '}of {(totalCount).toLocaleString()} entries
    </span>
  </div>
)

export default PerPage
