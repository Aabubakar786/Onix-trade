import React, {FC} from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  columns?: number
}
const TableBodySkeleton: FC<Props> = ({columns = 5}) => {
  return (
    <>
      {Array.from(new Array(columns)).map((a, i) => (
        <tr key={`tr-${i}`}>
          {Array.from(new Array(columns)).map((b, index) => (
            <td key={`td-${index}`}>
              <Skeleton />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

export default TableBodySkeleton
