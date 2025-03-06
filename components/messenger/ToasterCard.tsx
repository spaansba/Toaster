import images from "@/constants/images"
import { getToasterColors } from "@/helpers/GetToasterColors"
import type { CardToaster } from "@/types/types"
import { Image } from "expo-image"
import React from "react"
import { Pressable, View } from "react-native"
import ConnectedUsersPictures from "../ConnectedUsersPictures"
import CheckBox from "../general/CheckBox"
import { ToastText } from "../general/ToastText"

type ToasterCardProps = {
  isFirst: boolean
  isLast: boolean
  data: CardToaster
  isSelected: boolean
  onPress: (toaster: CardToaster) => void
}

const ToasterCard = ({ isFirst, isLast, data, isSelected, onPress }: ToasterCardProps) => {
  const { color, lightColor } = getToasterColors(data.style)
  // Choose either normal color or light color based on isSelected
  const backgroundColor = isSelected ? color : lightColor

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
    // setIsActive(!isActive)
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
            <ToastText className="font-courier-bold">{data.toasterName}</ToastText>
            <ToastText className="color-gray-500">Today</ToastText>
          </View>
        </View>

        <View className="flex-row items-center">
          <ConnectedUsersPictures
            connectedUsers={data.connected_users}
            backgroundColor={backgroundColor}
            size={20}
            maxVisibleUsers={2}
          />
          <View className="ml-2">
            <CheckBox showCheckmark={isSelected} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default ToasterCard
