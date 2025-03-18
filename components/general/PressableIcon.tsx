import tailwindConfig from "@/tailwind.config"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable } from "react-native"
import { PressableIonIcons } from "./PressedIonIcons"

type PressableIconProps = {
  onPress: () => void
  ionIcon: keyof typeof Ionicons.glyphMap
  size?: number
  wrapperClassName?: string
}

const PressableIcon = ({ onPress, ionIcon, wrapperClassName, size = 20 }: PressableIconProps) => {
  return (
    <Pressable onPress={onPress} hitSlop={20} className={wrapperClassName}>
      {({ pressed }) => (
        <Ionicons isPressed={pressed} name={ionIcon} size={size} className="ml-1 pb-0.5" />
      )}
    </Pressable>
  )
}

export default PressableIcon
