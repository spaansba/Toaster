import { Text, Pressable, type GestureResponderEvent } from "react-native"
import React from "react"

type CrossButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined
  size?: number
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
}

const CrossButton = ({
  onPress,
  size = 20,
  backgroundColor = "#6b7280",
  borderColor,
  borderWidth,
}: CrossButtonProps) => {
  // Only add styles for dynamic properties that can't be handled by NativeWind
  const dynamicStyles = {
    width: size,
    height: size,
    backgroundColor: backgroundColor,
    ...(borderWidth && { borderWidth }),
    ...(borderColor && { borderColor }),
  }

  return (
    <Pressable
      hitSlop={30}
      onPress={onPress}
      style={dynamicStyles}
      className="rounded-full z-10 flex justify-center items-center"
    >
      <Text className="text-xs font-bold text-white text-center leading-4">✕</Text>
    </Pressable>
  )
}

export default CrossButton
