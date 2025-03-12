import { View, Text, TouchableOpacity, Pressable } from "react-native"
import React, { ReactNode } from "react"
import { ToastText } from "../general/ToastText"
import { Ionicons } from "@expo/vector-icons"

type TitleInteraction = {
  onTitlePress?: () => void
  isChevronVisible?: boolean
}

type BaseScreenHeaderProps = {
  title: string
  onButtonPress: () => void
  children?: ReactNode
  titleInteraction?: TitleInteraction
}

const BaseScreenHeader = ({
  title,
  children,
  onButtonPress,
  titleInteraction,
}: BaseScreenHeaderProps) => {
  return (
    <View className="h-[90px] pt-[45px] px-6 flex-row items-center z-10 justify-between bg-primary-200">
      <Pressable onPress={titleInteraction?.onTitlePress}>
        <View className="flex-row items-center">
          <ToastText className="text-xl font-courier-bold">{title.toUpperCase()}</ToastText>
          {titleInteraction?.isChevronVisible && (
            <Ionicons name="chevron-down" size={22} className="ml-1 pb-0.5" color="#000" />
          )}
        </View>
      </Pressable>

      <TouchableOpacity
        className="size-[35px] flex items-center justify-center"
        onPress={onButtonPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  )
}

export default BaseScreenHeader
