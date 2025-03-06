import { router } from "expo-router"
import React from "react"
import { View } from "react-native"
import Svg, { Line } from "react-native-svg"
import ToasterButton from "./ToasterButton"

function CircleTabBarButton() {
  return (
    <View className="relative flex justify-center items-center">
      <View className="w-[70px] h-[45px]">
        <ToasterButton
          content={{
            type: "svg-element",
            element: (
              <Svg width="24" height="24" viewBox="0 0 24 24">
                <Line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="2" />
                <Line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
              </Svg>
            ),
          }}
          onPress={() => router.push("/sendMessage")}
          borderRadius={9999}
          variant="white"
          shadowOffset={3}
        />
      </View>
    </View>
  )
}

export default CircleTabBarButton
