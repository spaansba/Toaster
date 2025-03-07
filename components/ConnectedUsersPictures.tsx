import { Image } from "expo-image"
import React from "react"
import { View, type ColorValue, type DimensionValue } from "react-native"
import { ToastText } from "./general/ToastText"
import type { BaseUser } from "@/types/types"

type ConnectedUsersPicturesProps = {
  connectedUsers: BaseUser[]
  size?: DimensionValue
  maxVisibleUsers?: number
  overlapPercentage?: number // Percentage of overlap (0-100)
  backgroundColor: ColorValue | undefined
}

const ConnectedUsersPictures = ({
  connectedUsers,
  size = 30,
  maxVisibleUsers = 5,
  overlapPercentage = 35,
  backgroundColor,
}: ConnectedUsersPicturesProps) => {
  const sizeValue = typeof size === "number" ? size : 45

  // Calculate the negative margin for overlapping the profiles
  const overlapMargin = -((sizeValue * overlapPercentage) / 100)

  // Determine how many avatars to show
  const extraUsers = connectedUsers.length - maxVisibleUsers

  return (
    <View className="flex-row">
      {connectedUsers.map((user, index) =>
        index < maxVisibleUsers ? (
          <View
            key={`user-${user.userId}`}
            style={{
              marginLeft: index > 0 ? overlapMargin : 0,
              zIndex: index,
            }}
          >
            <View
              className=" border-[1px] rounded-full overflow-hidden"
              style={{ width: size, height: size, borderColor: backgroundColor }}
            >
              <View className="border-black border-[1px] rounded-full overflow-hidden">
                <Image
                  source={user.pictureUrl}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  transition={0}
                />
              </View>
            </View>
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
            borderColor: backgroundColor,
          }}
          className="border-[1px] rounded-full overflow-hidden"
        >
          <View className="border-black border-[1px] rounded-full overflow-hidden bg-white justify-center items-center flex-1">
            <ToastText className="text-center " style={{ fontSize: 10 }}>
              +{extraUsers}
            </ToastText>
          </View>
        </View>
      )}
    </View>
  )
}

export default ConnectedUsersPictures
