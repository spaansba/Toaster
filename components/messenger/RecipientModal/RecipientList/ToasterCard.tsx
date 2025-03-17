import images from "@/constants/images"
import { getToasterColors } from "@/helpers/GetToasterColors"
import { Image } from "expo-image"
import React from "react"
import { Pressable, View } from "react-native"
import ConnectedUsersPictures from "../../../ConnectedUsersPictures"

import { ToastText } from "../../../general/ToastText"
import CheckBox from "../../../general/CheckBox"
import type { BefriendedToaster } from "@/types/types"
import ProfilePicture from "@/components/ProfilePicture"

type ToasterCardProps = {
  isFirst: boolean
  isLast: boolean
  data: BefriendedToaster
  isSelected: boolean
  onPress: (toaster: BefriendedToaster) => void
}

const ToasterCard = ({ isFirst, isLast, data, isSelected, onPress }: ToasterCardProps) => {
  const { color, lightColor } = getToasterColors(data.style)
  // Choose either normal color or light color based on isSelected

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
    onPress(data)
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View
          className={`flex-row h-[50px] justify-between items-center px-3 ${getBorderStyle()}`}
          style={{ backgroundColor: isSelected || pressed ? color : lightColor }}
        >
          <View className="flex-row h-[50px] items-center">
            <ProfilePicture size={35} borderWidth={1} />
            <View className="flex-col ml-3">
              <ToastText className="font-courier-bold">{data.toasterName}</ToastText>
              <ToastText className="color-gray-500">Today</ToastText>
            </View>
          </View>

          <View className="flex-row items-center">
            <ConnectedUsersPictures
              connectedUsers={data.connectedUsers}
              backgroundColor={isSelected || pressed ? color : lightColor}
              size={20}
              maxVisibleUsers={2}
            />
            <View className="ml-2">
              <CheckBox showCheckmark={isSelected} />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default ToasterCard
