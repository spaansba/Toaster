import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { View, type GestureResponderEvent } from "react-native"
// Using nested Views instead of border props to create a clean circular button
// This approach prevents rendering issues where background might show through at the edges
type CrossButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | null | undefined
  size?: number
  borderColor?: string
}

const CrossSquare = ({ onPress, size = 20, borderColor = "#FFD580" }: CrossButtonProps) => {
  const outerBorderSize = 3
  const outerStyles = {
    width: size + outerBorderSize,
    height: size + outerBorderSize,
    borderRadius: 6,
    backgroundColor: borderColor,
  }

  const innerStyles = {
    width: size,
    height: size,
    borderRadius: 6,
  }

  const iconSize = Math.floor(size * 0.85)
  return (
    <View style={outerStyles} className="flex items-center justify-center overflow-hidden z-10">
      <View style={innerStyles} className="bg-[#6b7280] flex items-center justify-center">
        <Ionicons name="close-sharp" size={iconSize} color={"white"} />
      </View>
    </View>
  )
}

export default CrossSquare
