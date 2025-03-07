import { View, Text } from "react-native"
import React from "react"
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated"

type CheckmarkCircleProps = {
  showCheckmark: boolean
}

const CheckBox = ({ showCheckmark }: CheckmarkCircleProps) => {
  return (
    <>
      <View
        className={`rounded-lg w-[24px] h-[24px] flex justify-center items-center ${
          showCheckmark ? "bg-[#dd86f4]" : ""
        }`}
      >
        <View
          className={`border-black border-[1px] rounded-md w-[20px] h-[20px] items-center justify-center ${
            showCheckmark ? "bg-[#dd86f4]" : "bg-white"
          }`}
        >
          {showCheckmark ? (
            <Animated.View entering={ZoomIn.duration(150)} exiting={ZoomOut.duration(150)}>
              <Text style={{ fontSize: 14, color: "black" }}>✓</Text>
            </Animated.View>
          ) : (
            <View />
          )}
        </View>
      </View>
    </>
  )
}

export default CheckBox
