import { View, Text } from "react-native"
import React from "react"
import { Image } from "expo-image"
import images from "@/constants/images"

type ProfilePictureProps = {
  size?: number
  borderWidth?: number
  source?: any // Optional to allow custom image source
}

const ProfilePicture = ({
  size = 35,
  borderWidth = 1,
  source = images.hoofd,
}: ProfilePictureProps) => {
  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: borderWidth,
        width: size,
        height: size,
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={0}
      />
    </View>
  )
}

export default ProfilePicture
