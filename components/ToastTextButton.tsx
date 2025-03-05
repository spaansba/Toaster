import React from "react"
import { Button, type ButtonProps } from "react-native"

type ToastTextButtonProps = ButtonProps & {}

const ToastTextButton = (props: ToastTextButtonProps) => {
  const { color = "black", ...otherProps } = props

  return <Button color={color} {...otherProps} />
}

export default ToastTextButton
