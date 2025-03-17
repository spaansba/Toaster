import { View, Text, Pressable } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import { ToastText } from "../general/ToastText"

type NestedScreenHeaderProps = {
  title: string
}

const NestedScreenHeader = ({ title }: NestedScreenHeaderProps) => {
  return (
    <View className="h-[90px] pt-[45px] border-[1px] border-black px-3 flex-row items-center z-10 bg-primary-200">
      <View className="flex-1 flex-row items-center">
        <Pressable
          onPress={() => {
            router.back()
          }}
          hitSlop={20}
        >
          <Ionicons name="chevron-back" size={25} className="text-xl font-bold" />
        </Pressable>
      </View>

      <View className="flex-1 items-center">
        <ToastText className="text-xl font-courier-bold">{title.toUpperCase()}</ToastText>
      </View>

      {/* Empty view to balance the layout */}
      <View className="flex-1" />
    </View>
  )
}

export default NestedScreenHeader
