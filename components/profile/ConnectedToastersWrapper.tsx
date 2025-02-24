import { View, Text, ScrollView } from "react-native"
import React from "react"
import ConnectedToaster from "./ConnectedToaster"

const ConnectedToastersWrapper = () => {
  return (
    <ScrollView>
      <View className="mt-10 mx-10 gap-6">
        <ConnectedToaster handleOnSettingsPress={() => {}} />
        <ConnectedToaster handleOnSettingsPress={() => {}} />
      </View>
    </ScrollView>
  )
}

export default ConnectedToastersWrapper
