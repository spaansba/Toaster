import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"
import { FontAwesome } from "@expo/vector-icons"

const MessengerScreenHeader = () => {
  return (
    <BaseScreenHeader title="SEND A MESSAGE" onPress={() => {}}>
      <FontAwesome name="cog" size={24} color="black" />
    </BaseScreenHeader>
  )
}

export default MessengerScreenHeader
