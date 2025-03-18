import { router } from "expo-router"
import React from "react"
import { View } from "react-native"
import PressableIcon from "../general/PressableIcon"
import { ToastText } from "../general/ToastText"

type NestedScreenHeaderProps = {
  title: string
}

const NestedScreenHeader = ({ title }: NestedScreenHeaderProps) => {
  return (
    <View className="h-[90px] pt-[45px] border-b-[1px] border-b-black px-3 flex-row items-center z-10 bg-primary-200">
      <View className="flex-1 flex-row items-center">
        <PressableIcon
          onPress={() => {
            router.back()
          }}
          ionIcon="chevron-back"
          size={25}
        />
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
