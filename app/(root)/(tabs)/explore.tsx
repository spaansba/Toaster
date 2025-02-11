import { View, Text, SafeAreaView } from "react-native"
import React from "react"

const explore = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Left side</Text>
        </View>
        <View style={{ width: 1, backgroundColor: "black", height: "100%" }} />
        <View style={{ flex: 1 }}>
          <Text>Right side</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default explore
