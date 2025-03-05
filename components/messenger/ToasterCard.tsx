import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import type { ToasterStyle } from "@/types/types"
import { Image } from "expo-image"
import images from "@/constants/images"
import { getToasterColor } from "@/helpers/GetToasterColor"
import { ToastText } from "../general/ToastText"
import ConnectedUsersPictures from "../ConnectedUsersPictures"
import CheckmarkCircle from "../general/CheckmarkCircle"

type ToasterCardProps = {
  isFirst: boolean
  isLast: boolean
  style: ToasterStyle
}

const ToasterCard = ({ isFirst, isLast, style }: ToasterCardProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const backgroundColor = getToasterColor(style)

  const getBorderStyle = () => {
    const borderSize = "1px"
    const borderColor = "border-black"
    switch (true) {
      case isFirst && isLast:
        return `${borderColor} border-[${borderSize}] rounded-t-lg rounded-b-lg`

      case isFirst:
        return `${borderColor} border-[${borderSize}] rounded-t-lg`

      case isLast:
        return `${borderColor} border-l-[${borderSize}] border-r-[${borderSize}] border-b-[${borderSize}] rounded-b-lg`

      default:
        return `${borderColor} border-l-[${borderSize}] border-r-[${borderSize}] border-b-[${borderSize}]`
    }
  }

  const handlePress = () => {
    setIsClicked(!isClicked)
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
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
              images.hoofd,
            ]}
            size={20}
            maxVisibleUsers={4}
          />
          <CheckmarkCircle showCheckmark={isClicked} />
        </View>
      </View>
    </Pressable>
  )
}

export default ToasterCard
