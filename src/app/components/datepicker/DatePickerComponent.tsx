import React, {FC, LegacyRef, ReactNode, useState, MouseEvent, CSSProperties} from 'react'
import {Calendar} from 'react-date-range'
import {Dropdown} from 'react-bootstrap'

import moment from 'moment'
import './datePicker.scss'

type Props = {
  date: Date
  onChange: (date: Date) => void
  toggleClassName?: string
  children?: ReactNode
}
const DatePickerComponent: FC<Props> = ({
  date,
  onChange,
  toggleClassName = 'form-control date-picker__toggle d-flex align-items-center input',
  ...props
}) => {
  // eslint-disable-next-line react/prop-types
  const CustomToggle = React.forwardRef(
    (
      {children, onClick}: {children: ReactNode; onClick: (e: MouseEvent<HTMLDivElement>) => void},
      ref
    ) => (
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        onClick={(e) => {
          e.preventDefault()
          onClick(e)
        }}
        className={`${toggleClassName}`}
      >
        {children}
      </div>
    )
  )
  const CustomMenu = React.forwardRef(
    // eslint-disable-next-line react/prop-types
    (
      {
        style,
        className,
        'aria-labelledby': labeledBy,
      }: {style: CSSProperties; className: string; 'aria-labelledby': string},
      ref
    ) => {
      const [state, setState] = useState<Date>(moment(date).isValid() ? new Date(date) : new Date())

      return (
        <div
          ref={ref as LegacyRef<HTMLDivElement>}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Calendar
            date={state}
            onChange={(item: Date) => {
              setState(item)
              if (onChange) {
                onChange(item)
              }
            }}
            color={'#FE9300'}
            rangeColors={['#FE9300']}
          />
          {/*<div className=' d-flex  align-items-center justify-content-end mr-2 mb-2'>*/}
          {/*  <Dropdown.Item*/}
          {/*    as={Bu}*/}
          {/*    className='d-flex w-auto date-picker__apply-btn'*/}
          {/*    type='button'*/}
          {/*    text*/}
          {/*  >*/}
          {/*    Cancel*/}
          {/*  </Dropdown.Item>*/}
          {/*  <Dropdown.Item*/}
          {/*    as={StyledButton}*/}
          {/*    type='button'*/}
          {/*    className='d-flex w-auto date-picker__apply-btn'*/}
          {/*    onClick={handleApply}*/}
          {/*    text*/}
          {/*  >*/}
          {/*    Ok*/}
          {/*  </Dropdown.Item>*/}
          {/*</div>*/}
        </div>
      )
    }
  )

  return (
    <Dropdown>
      <Dropdown.Toggle id='single-date-picker' as={CustomToggle}>
        {props.children || (
          <span className='date-view m-0 text-muted'>
            {moment(date).isValid() ? moment(date).format('d MMMM, YYYY') : 'Select Date'}
          </span>
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu} className='p-0 border-0 shadow-lg' />
    </Dropdown>
  )
}

export default DatePickerComponent
