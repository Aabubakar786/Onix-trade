import React, {FC, MouseEventHandler, ReactNode} from 'react'

type Props = {
  children: ReactNode
  onClose?: MouseEventHandler<HTMLDivElement>
}
const Tag: FC<Props> = ({onClose, children}) => {
  return (
    <div className='tagify'>
      <div className='tagify__tag d-flex  align-items-center'>
        {onClose && <div className='tagify__tag__removeBtn cursor-pointer' onClick={onClose} />}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Tag
