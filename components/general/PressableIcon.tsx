import { View, Text, Pressable } from "react-native"
import React from "react"
import { ToastText } from "./ToastText"
import { Ionicons } from "@expo/vector-icons"
import tailwindConfig from "@/tailwind.config"

type PressableIconProps = {
  onPress: () => void
  ionIcon: keyof typeof Ionicons.glyphMap
  size?: number
  wrapperClassName?: string
}

const PressableIcon = ({ onPress, ionIcon, wrapperClassName, size = 20 }: PressableIconProps) => {
  const config = tailwindConfig as any
  return (
    <Pressable onPress={onPress} hitSlop={20} className={wrapperClassName}>
      {({ pressed }) => (
        <Ionicons
          name={ionIcon}
          size={size}
          color={`${pressed ? config.theme.extend.colors.accent["text-press"] : "bg-black"}`}
        />
      )}
    </Pressable>
  )
}

export default PressableIcon
