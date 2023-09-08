import React, {FC} from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  columns?: number
}
const ProductTableSkeleton: FC<Props> = ({columns = 5}) => {
  return (
    <>
      {Array.from(new Array(5)).map((a, i) => (
        <tr key={`tr-${i}`}>
          <td>
            <div className='d-flex align-items-center'>
              <div className=' me-5'>
                <Skeleton width={45} height={45} />
              </div>
              <div className='d-flex justify-content-start flex-column'>
                <span>
                  <Skeleton width={150} />
                </span>
                <span>
                  <Skeleton width={125} />
                </span>
              </div>
            </div>
          </td>
          <td>
            <Skeleton height={30} width={70} />
          </td>
          <td>
            <Skeleton width={100} />
          </td>
          <td align='right'>
            <div className='d-flex justify-content-end'>
              <Skeleton width={36} height={36} className='me-2' />
              <Skeleton width={36} height={36} className='me-2' />
              <Skeleton width={36} height={36} />
            </div>
          </td>
        </tr>
      ))}
    </>
  )
}
export default ProductTableSkeleton
