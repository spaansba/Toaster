import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import type { CardToaster, ToasterStyle } from "@/types/types"
import { Image } from "expo-image"
import images from "@/constants/images"
import { getToasterColors } from "@/helpers/GetToasterColors"
import { ToastText } from "../general/ToastText"
import ConnectedUsersPictures from "../ConnectedUsersPictures"
import CheckBox from "../general/CheckBox"

type ToasterCardProps = {
  isFirst: boolean
  isLast: boolean
  data: CardToaster
  onPress: (toaster: CardToaster) => void
}

const ToasterCard = ({ isFirst, isLast, data, onPress }: ToasterCardProps) => {
  const [isActive, setIsActive] = useState(data.isSelected)
  const { color, lightColor } = getToasterColors(data.style)

  // Choose either normal color or light color based on isSelected
  const backgroundColor = isActive ? color : lightColor

  const getBorderStyle = () => {
    switch (true) {
      case isFirst && isLast:
        return `border-black border-[1px] rounded-t-lg rounded-b-lg`

      case isFirst:
        return `border-black border-[1px] rounded-t-lg`

      case isLast:
        return `border-black border-l-[1px] border-r-[1px] border-b-[1px] rounded-b-lg`

      default:
        return `border-black border-l-[1px] border-r-[1px] border-b-[1px]`
    }
  }

  const handlePress = () => {
    setIsActive(!isActive)
    onPress(data)
  }

  return (
    <Pressable onPress={handlePress}>
      <View
        className={`flex-row h-[50px] justify-between items-center px-3 ${getBorderStyle()}`}
        style={{ backgroundColor: backgroundColor }}
      >
        <View className="flex-row h-[50px] items-center">
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

        <View className="flex-row items-center">
          <ConnectedUsersPictures
            backgroundColor={backgroundColor}
            imagesAsUrl={[
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
            ]}
            size={20}
            maxVisibleUsers={8}
          />
          <View className="ml-2">
            <CheckBox showCheckmark={isActive} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default ToasterCard
