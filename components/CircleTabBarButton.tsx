import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React, { useState } from "react"
import { Pressable, View, LayoutChangeEvent } from "react-native"
import Svg, { Line } from "react-native-svg"

function CircleTabBarButton() {
  const [buttonLayout, setButtonLayout] = useState({ width: 0, height: 0 })

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    setButtonLayout({ width, height })
  }

  return (
    <View className="relative flex justify-center items-center">
      <Pressable
        className="flex justify-center items-center"
        onPress={() => router.push("/test")}
        onLayout={onLayout}
      >
        <View
          className="absolute top-[3px] left-[3px] w-[70px] h-[45px] bg-black rounded-full"
          style={{
            width: buttonLayout.width,
            height: buttonLayout.height,
          }}
        />
        <View className="w-[70px] h-[45px] border-black border-2 bg-white rounded-full flex justify-center items-center">
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="2" />
            <Line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
          </Svg>
        </View>
      </Pressable>
    </View>
  )
}

export default CircleTabBarButton
