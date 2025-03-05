import { Text, type TextProps } from "react-native"

type ToastTextProps = TextProps & {
  className?: string
}

export function ToastText(props: ToastTextProps) {
  const { className, style, ...otherProps } = props

  return <Text className={`font-courier ${className || ""}`} style={style} {...otherProps} />
}
