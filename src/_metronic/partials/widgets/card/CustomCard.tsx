import React, { FC, ReactNode } from 'react'

type Props = {
  title: string | ReactNode
  subtitle?: string | ReactNode
  totalHover?: string
  toolbar?: string | ReactNode
  cardFooter?: string | ReactNode
  className?: string
  headerClassName?: string
  bodyClassName?: string
  toolbarClassName?: string
  footerClassName?: string
  size?: 'default' | 'small'
  children: ReactNode
}
const CustomCard: FC<Props> = ({
  title,
  subtitle,
  totalHover,
  toolbar,
  cardFooter,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  toolbarClassName = '',
  footerClassName = '',
  size = 'default',
  children,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className={`card-header ${size === 'small' ? 'small' : ''} ${headerClassName}`}>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bolder fs-3 mb-1'>{title}</span>
          {subtitle && <span title={totalHover} className='text-muted mt-1 fw-bold fs-7'>{subtitle}</span>}
        </h3>

        {toolbar && <div className={`card-toolbar ${toolbarClassName}`}>{toolbar}</div>}
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className={`card-body ${size === 'small' ? 'small' : ''} ${bodyClassName} py-3`}>
        {children}
      </div>
      {/* begin::Body */}
      <div className={`card-footer ${size === 'small' ? 'small' : ''} ${footerClassName}`}>
        {cardFooter}
      </div>
    </div>
  )
}

export default CustomCard
