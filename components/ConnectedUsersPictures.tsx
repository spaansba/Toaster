import { View, Text, type DimensionValue } from "react-native"
import React from "react"
import images from "@/constants/images"
import { Image } from "expo-image"

type ConnectedUsersPictures = {
  imagesAsUrl?: string[]
  size?: DimensionValue | undefined
}

const ConnectedUsersPictures = ({ imagesAsUrl, size = 45 }: ConnectedUsersPictures) => {
  const BaseUserPicture = () => {
    return (
      <View
        className="border-primary-200 border-[1px] rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <View className=" border-black border-[1px] rounded-full overflow-hidden">
          <Image
            source={images.hoofd}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={0}
          />
        </View>
      </View>
    )
  }

  return (
    <View className="flex-row ">
      <View className="z-[1]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[30px] z-[2]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[60px] z-[3]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[90px] z-[4]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[120px] z-[5]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[150px] z-[6]">
        <BaseUserPicture />
      </View>
      <View className="absolute left-[180px] z-[7]">
        <View className="size-[45px] border-primary-200 border-[1px] rounded-full overflow-hidden">
          <View className="border-black border-[1px] rounded-full overflow-hidden bg-white justify-center items-center flex-1">
            <Text className="text-center">+9</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ConnectedUsersPictures
