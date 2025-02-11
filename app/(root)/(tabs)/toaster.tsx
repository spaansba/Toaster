import { View, Text, SafeAreaView } from "react-native"
import React from "react"

const Toaster = () => {
  return (
    <SafeAreaView
      className="bg-primary-200"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10 font-courier-italic">My Toaster Tab</Text>
    </SafeAreaView>
  )
}

export default Toaster
