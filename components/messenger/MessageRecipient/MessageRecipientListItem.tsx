import { View, Text, TouchableOpacity, Pressable } from "react-native"
import React from "react"
import type { BefriendedToaster } from "@/types/types"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import ProfilePicture from "@/components/ProfilePicture"
import { ToastText } from "@/components/general/ToastText"
import { Ionicons } from "@expo/vector-icons"
import { TruncateString } from "@/helpers/TruncateString"
import Animated, {
  CurvedTransition,
  LayoutAnimationConfig,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"
import { getToasterColors } from "@/helpers/GetToasterColors"
import { Image } from "expo-image"
import images from "@/constants/images"

type MessageRecipientItemProps = {
  toaster: BefriendedToaster
}

const MessageRecipientListItem = ({ toaster }: MessageRecipientItemProps) => {
  const toggleRecipient = useRecipientsStore((state) => state.ToggleSelectedRecipient)
  const backgroundColor = getToasterColors(toaster.style)
  return (
    //Makes going from 2 to 1 animation better
    <LayoutAnimationConfig skipExiting>
      <Animated.View
        entering={ZoomIn.duration(100)}
        layout={CurvedTransition.duration(80)}
        exiting={ZoomOut.duration(100)}
        key={toaster.toasterId}
        className="mx-[6px] h-full  pr-4"
      >
        <Pressable
          className="flex-row items-center border-[1px] border-black rounded-lg"
          style={{ backgroundColor: backgroundColor.color }}
          onPress={() => toggleRecipient(toaster)}
        >
          <View className="size-[35px] overflow-hidden rounded-md">
            <Image
              source={images.hoofd}
              style={{ width: "100%", height: "100%", overflow: "hidden" }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={0}
            />
          </View>
          <ToastText className="text-sm tracking-tighter ml-2">
            {TruncateString(toaster.toasterName)}
          </ToastText>
          <View className="mx-[6px] rounded-full ">
            <Ionicons name="close" size={14} color="#1c1917" />
          </View>
        </Pressable>
      </Animated.View>
    </LayoutAnimationConfig>
  )
}

export default MessageRecipientListItem
