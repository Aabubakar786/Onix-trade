import React, {CSSProperties} from 'react'
import SVG from 'react-inlinesvg'
import {toAbsoluteUrl} from '../AssetHelpers'
type Props = {
  className?: string
  path: string
  svgClassName?: string
  style?: CSSProperties | undefined
  transparent?: boolean | undefined;
}

const KTSVG: React.FC<Props> = ({className = '', path, svgClassName = 'mh-50px', style, transparent}) => {
  return (
    <span className={`${!transparent && 'svg-icon'} ${className}`} style={style}>
      <SVG src={toAbsoluteUrl(path)} className={svgClassName} />
    </span>
  )
}

export {KTSVG}
