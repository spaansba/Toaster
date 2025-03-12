import { View, Text } from "react-native"
import React from "react"
import BaseScreenHeader from "../screen_header/BaseScreenHeader"

const ConnectedToastersScreenHeader = () => {
  return (
    <BaseScreenHeader
      title={""}
      onButtonPress={function (): void {
        throw new Error("Function not implemented.")
      }}
    />
  )
}

export default ConnectedToastersScreenHeader
