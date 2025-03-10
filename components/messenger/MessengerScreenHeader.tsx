import images from "@/constants/images"
import { Image } from "expo-image"
import React from "react"
import BaseScreenHeader from "../ScreenHeader/BaseScreenHeader"
import { View } from "react-native"
import ProfilePicture from "../ProfilePicture"

const MessengerScreenHeader = () => {
  return (
    <BaseScreenHeader title="SEND A MESSAGE" onPress={() => {}}>
      {/* <View
        className="absolute bg-black"
        style={{
          left: 1.2,
          top: 1.2,
          borderRadius: 999999999,
          width: 35,
          height: 35,
        }}
      /> */}
      <ProfilePicture size={35} borderWidth={1} />
    </BaseScreenHeader>
  )
}

export default MessengerScreenHeader
