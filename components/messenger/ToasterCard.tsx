import { View, Text } from "react-native"
import React from "react"
import type { ToasterStyle } from "@/types/types"

type ToasterCardProps = {
  style: ToasterStyle
  handleOnSettingsPress: () => void
}

const ToasterCard = ({ style, handleOnSettingsPress }: ToasterCardProps) => {
  return (
    <View>
      <Text>ToasterCard</Text>
    </View>
  )
}

export default ToasterCard
