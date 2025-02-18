import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React, { useState } from "react"
import { Pressable, View, LayoutChangeEvent } from "react-native"
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
          onPress={() => router.push("/test")}
          borderRadius={9999}
          variant="white"
          shadowOffset={3}
        />
      </View>
      {/* 
      <Pressable className="flex justify-center items-center" onPress={() => router.push("/test")}>
        <View className="absolute w-[70px] h-[45px] bg-black rounded-full top-[2px] left-[2px]" />
        <View className="w-[70px] h-[45px] border-black border-2 bg-white rounded-full flex justify-center items-center">
          <Svg width="24" height="24" viewBox="0 0 24 24">
            <Line x1="12" y1="4" x2="12" y2="20" stroke="black" strokeWidth="2" />
            <Line x1="4" y1="12" x2="20" y2="12" stroke="black" strokeWidth="2" />
          </Svg>
        </View>
      </Pressable> */}
    </View>
  )
}

export default CircleTabBarButton
