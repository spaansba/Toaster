import { View, Text, Pressable } from "react-native"
import React from "react"
import { Square } from "./svg/Square"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

const CenterTabButton = () => {
  const fakeBorderWidth = 3
  const stickOutMargin = 20
  return (
    <Pressable onPress={() => router.push("/home")}>
      <View
        style={{
          position: "relative",
          height: 60,
          marginTop: -stickOutMargin,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main button content */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#FFD787",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="add" size={50} />
        </View>

        {/* Left border */}
        <View
          style={{
            position: "absolute",
            top: stickOutMargin,
            left: -fakeBorderWidth,
            bottom: -fakeBorderWidth,
            width: fakeBorderWidth,
            backgroundColor: "black",
          }}
        />

        {/* Right border */}
        <View
          style={{
            position: "absolute",
            top: stickOutMargin,
            right: -fakeBorderWidth,
            bottom: -fakeBorderWidth,
            width: fakeBorderWidth,
            backgroundColor: "black",
          }}
        />

        {/* Bottom border */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -fakeBorderWidth,
            height: fakeBorderWidth,
            backgroundColor: "black",
          }}
        />
      </View>
    </Pressable>
  )
}

export default CenterTabButton
