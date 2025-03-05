import { View, Text } from "react-native"
import React from "react"
import type { ToasterStyle } from "@/types/types"
import { Image } from "expo-image"
import images from "@/constants/images"
import { getToasterColor } from "@/helpers/GetToasterColor"
import { ToastText } from "../ToastText"
type ToasterCardProps = {
  style: ToasterStyle
}

const ToasterCard = ({ style }: ToasterCardProps) => {
  const backgroundColor = getToasterColor(style)
  return (
    <View
      className="flex-row h-[50px] items-center pl-3"
      style={{ backgroundColor: backgroundColor }}
    >
      <View className="border-black border-[1px] size-[35px] rounded-full overflow-hidden">
        <Image
          source={images.hoofd}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={0}
        />
      </View>
      <View className="flex-col ml-3">
        <ToastText className="font-courier-bold">Name</ToastText>
        <ToastText className="color-gray-500">Today</ToastText>
      </View>
    </View>
  )
}

export default ToasterCard
