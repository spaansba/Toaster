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
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
        },
      ]}
      className="flex-row items-center justify-between  py-4 px-5"
    >
      {({ pressed }) => (
        <>
          <View className={`flex-row items-center gap-6 `}>
            <Ionicons name={ionIcon} size={25} />
            <ToastText className="text-lg">{label}</ToastText>
            <ToastText>{pressed}</ToastText>
          </View>
          <Ionicons name="chevron-forward" size={20} color={"#748492"} />
        </>
      )}
    </Pressable>
  )
}

export default SettingMenuItem
