import React from "react"
import Svg, { Rect, type SvgProps } from "react-native-svg"
type SquareProps = SvgProps & {
  color?: string
}

export const Square: React.FC<SquareProps> = ({ color = "#000000", ...props }) => {
  return (
    <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
      <Rect x="-20" y="-20" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
    </Svg>
  )
}
