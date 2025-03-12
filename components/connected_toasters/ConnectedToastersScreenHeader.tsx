import { View, Text } from "react-native"
import React from "react"
import BaseScreenHeader from "../screen_header/BaseScreenHeader"
import ToasterButton from "../ToasterButton"

const ConnectedToastersScreenHeader = () => {
  return (
    <BaseScreenHeader
      title={"Current Toaster"}
      onButtonPress={() => {}}
      titleInteraction={{ isChevronVisible: true, onTitlePress: () => {} }}
    ></BaseScreenHeader>
  )
}

export default ConnectedToastersScreenHeader
