import { View, Pressable } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { ToastText } from "@/components/general/ToastText"

type SettingMenuItemProps = {
  label: string
  ionIcon: keyof typeof Ionicons.glyphMap
  onPress: () => void
}

const SettingMenuItem = ({ label, ionIcon, onPress }: SettingMenuItemProps) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          className={` py-4 px-5 flex-row items-center justify-between ${
            pressed ? "bg-toaster-yellow" : "transparant"
          }`}
        >
          <View className={`flex-row items-center gap-6 `}>
            <Ionicons name={ionIcon} size={25} />
            <ToastText className="text-lg">{label}</ToastText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={`${pressed ? "black" : "#748492"}`} />
        </View>
      )}
    </Pressable>
  )
}

export default SettingMenuItem
