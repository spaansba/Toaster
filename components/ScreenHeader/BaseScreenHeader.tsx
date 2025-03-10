import { View, Text, TouchableOpacity, Pressable } from "react-native"
import React, { ReactNode } from "react"

type BaseScreenHeaderProps = {
  title: string
  onButtonPress: () => void
  children?: ReactNode
  onTitlePress?: () => void
}

const BaseScreenHeader = ({
  title,
  children,
  onButtonPress,
  onTitlePress,
}: BaseScreenHeaderProps) => {
  return (
    <View className="h-[90px] pt-[45px] px-6 flex-row items-center z-10 justify-between bg-primary-200">
      <Pressable onPress={() => {}}>
        <Text className="text-xl font-bold">{title.toUpperCase()}</Text>
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
