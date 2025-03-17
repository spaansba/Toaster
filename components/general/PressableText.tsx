import { View, Text, Pressable } from "react-native"
import React from "react"
import { ToastText } from "./ToastText"

type PressableTextProps = {
  onPress: () => void
  label: string
  textClassname?: string
  wrapperClassname?: string
  isBold?: boolean
}

const PressableText = ({
  onPress,
  label,
  textClassname,
  wrapperClassname,
  isBold = true,
}: PressableTextProps) => {
  return (
    <Pressable onPress={onPress} className={wrapperClassname}>
      {({ pressed }) => (
        <ToastText
          className={` ${textClassname || ""}  ${isBold ? "font-courier-bold" : "font-courier"} ${
            pressed ? "color-accent-text-press" : "color-black"
          } `}
        >
          {label}
        </ToastText>
      )}
    </Pressable>
  )
}

export default PressableText
