import React, {FC} from 'react'
import ReactPaginate from 'react-paginate'
import PerPage from './PerPage'

type Props = {
  perPage: number
  onPerPageChange: (perPage: number) => void
  pageNo: number
  onPageChange: (selectedItem: {selected: number}) => void
  totalCount: number
  dataLength:number
}
const PaginationPerPage: FC<Props> = ({
  perPage,
  onPerPageChange,
  pageNo,
  onPageChange,
  totalCount,
  dataLength
}) => (
  <div className='d-flex flex-stack flex-wrap pt-10'>
    <PerPage
      onPerPageChange={onPerPageChange}
      pageNo={pageNo}
      perPage={perPage}
      totalCount={totalCount}
      dataLength={dataLength}
    />
    <ReactPaginate
      pageCount={totalCount / perPage}
      onPageChange={onPageChange}
      forcePage={pageNo - 1}
      marginPagesDisplayed={2}
      containerClassName='pagination'
      pageLinkClassName='page-link'
      pageClassName='page-item'
      previousClassName='page-item previous'
      previousLinkClassName='page-link'
      nextLinkClassName='page-link'
      nextClassName='page-item next'
      previousLabel={<i className='previous' />}
      nextLabel={<i className='next' />}
      activeClassName='activePage rounded'
    />
  </div>
)

export default PaginationPerPage
