// BaseScreenHeader.tsx
import { View, Text, TouchableOpacity } from "react-native"
import React, { ReactNode } from "react"

type BaseScreenHeaderProps = {
  title: string
  onPress: () => void
  children?: ReactNode
}

const BaseScreenHeader = ({ title, children, onPress }: BaseScreenHeaderProps) => {
  return (
    <View className="h-[90px] pt-[45px] px-6 flex-row items-center z-10 justify-between bg-primary-200">
      <Text className="text-xl font-bold">{title.toUpperCase()}</Text>
      <TouchableOpacity className="size-[35px] flex items-center justify-center" onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  )
}

export default BaseScreenHeader
