import React, {FC} from 'react'

import Skeleton from 'react-loading-skeleton'
import TableBodySkeleton from './TableBodySkeleton'

type Props = {
  columns?: number
}
const TableSkeleton: FC<Props> = ({columns = 5}) => (
  <table className='table table-row-dashed table-row-gray-300'>
    <thead>
      <tr>
        {Array.from(new Array(columns)).map((a, i) => (
          <th key={`th-${i}`}>
            <Skeleton />
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      <TableBodySkeleton columns={columns} />
    </tbody>
  </table>
)

export default TableSkeleton
