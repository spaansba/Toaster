import { SafeAreaView, Text } from "react-native"
import React from "react"

const profile = () => {
  return (
    <SafeAreaView
      className="bg-primary-200"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-courier-italic">Hello</Text>
    </SafeAreaView>
  )
}

export default profile
