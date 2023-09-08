import React, {FC} from 'react'

type Props = {
  menuToggle: React.ReactNode
  menuBody: React.ReactNode
  toggleClassName?: string
  menuClassName?: string
  menuWidth?: string
}
const CustomMenu: FC<Props> = ({
  menuToggle,
  menuClassName = 'py-4',
  menuBody,
  toggleClassName,
  menuWidth = 'w-250px',
}) => {
  return (
    <div>
      <div
        className={`cursor-pointer symbol ${toggleClassName}`}
        data-kt-menu-trigger='click'
        data-kt-menu-attach='parent'
        data-kt-menu-placement='bottom-start'
        data-kt-menu-flip='top'
      >
        {menuToggle}
      </div>

      <div
        className={`menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold fs-6 ${menuClassName} ${menuWidth}`}
        data-kt-menu='true'
      >
        {menuBody}
      </div>
    </div>
  )
}

export default CustomMenu
