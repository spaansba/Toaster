import { View, Text, type DimensionValue } from "react-native"
import React from "react"
import images from "@/constants/images"
import { Image } from "expo-image"

type ConnectedUsersPictures = {
  imagesAsUrl?: string[]
  size?: DimensionValue
  maxVisibleUsers?: number
  overlapPercentage?: number // Percentage of overlap (0-100)
}

const ConnectedUsersPictures = ({
  imagesAsUrl = [],
  size = 30,
  maxVisibleUsers = 5,
  overlapPercentage = 35,
}: ConnectedUsersPictures) => {
  const sizeValue = typeof size === "number" ? size : 45

  // Calculate the negative margin for overlapping the profiles
  const overlapMargin = -((sizeValue * overlapPercentage) / 100)

  // Determine how many avatars to show
  const extraUsers = imagesAsUrl.length - maxVisibleUsers

  const BaseUserPicture = ({ imageUrl }: { imageUrl: string }) => {
    return (
      <View
        className="border-primary-200 border-[1px] rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        <View className="border-black border-[1px] rounded-full overflow-hidden">
          <Image
            source={imageUrl}
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
    <View className="flex-row">
      {imagesAsUrl.map((imageUrl, index) =>
        index < maxVisibleUsers ? (
          <View
            key={`user-${imageUrl}`}
            style={{
              marginLeft: index > 0 ? overlapMargin : 0,
              zIndex: index,
            }}
          >
            <BaseUserPicture imageUrl={imageUrl} />
          </View>
        ) : null
      )}

      {extraUsers > 1 && (
        <View
          style={{
            marginLeft: overlapMargin,
            zIndex: maxVisibleUsers + 1,
            width: size,
            height: size,
          }}
          className="border-primary-200 border-[1px] rounded-full overflow-hidden"
        >
          <View className="border-black border-[1px] rounded-full overflow-hidden bg-white justify-center items-center flex-1">
            <Text className="text-center text-xs">+{extraUsers}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

export default ConnectedUsersPictures
