import { View, Text } from "react-native"
import React from "react"

type CheckmarkCircleProps = {
  showCheckmark: boolean
}

const CheckmarkCircle = ({ showCheckmark }: CheckmarkCircleProps) => {
  return (
    <View className="ml-2 border-black border-[1px] bg-white rounded-full w-[24px] h-[24px] items-center justify-center">
      {showCheckmark ? <Text style={{ fontSize: 14 }}>✓</Text> : <View />}
    </View>
  )
}

export default CheckmarkCircle
