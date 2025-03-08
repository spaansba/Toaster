import { Text, Pressable, type GestureResponderEvent, View } from "react-native"
import React from "react"
import Entypo from "@expo/vector-icons/Entypo"
import { Ionicons } from "@expo/vector-icons"

// Using nested Views instead of border props to create a clean circular button
// This approach prevents rendering issues where background might show through at the edges
type CrossButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined
  size?: number
  borderColor?: string
}

const CrossButton = ({ onPress, size = 20, borderColor = "#FFD580" }: CrossButtonProps) => {
  const outerBorderSize = 3
  const outerStyles = {
    width: size + outerBorderSize,
    height: size + outerBorderSize,
    borderRadius: (size + outerBorderSize) / 2,
    backgroundColor: borderColor,
  }

  const innerStyles = {
    width: size,
    height: size,
    borderRadius: size / 2,
  }

  const iconSize = Math.floor(size * 0.85)

  return (
    <View style={outerStyles} className="flex items-center justify-center overflow-hidden z-10">
      <Pressable
        hitSlop={30}
        onPress={onPress}
        style={innerStyles}
        className="bg-[#6b7280] flex items-center justify-center"
      >
        <Ionicons name="close-sharp" size={iconSize} color="white" />
      </Pressable>
    </View>
  )
}

export default CrossButton
