import { View, Text, TouchableOpacity, Pressable } from "react-native"
import React from "react"
import type { BefriendedToaster } from "@/types/types"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import ProfilePicture from "@/components/ProfilePicture"
import { ToastText } from "@/components/general/ToastText"
import { Ionicons } from "@expo/vector-icons"
import { TruncateString } from "@/helpers/TruncateString"
import Animated, { CurvedTransition, ZoomIn, ZoomOut } from "react-native-reanimated"

type MessageRecipientItemProps = {
  toaster: BefriendedToaster
}

const MessageRecipientListItem = ({ toaster }: MessageRecipientItemProps) => {
  const toggleRecipient = useRecipientsStore((state) => state.ToggleSelectedRecipient)

  return (
    <Animated.View
      entering={ZoomIn.duration(100)}
      layout={CurvedTransition.duration(80)}
      exiting={ZoomOut.duration(100)}
      key={toaster.toasterId}
      className="mx-[6px] h-full"
    >
      <Pressable className="flex-row items-center" onPress={() => toggleRecipient(toaster)}>
        <ProfilePicture />
        <ToastText className="text-sm tracking-tighter ml-2">
          {TruncateString(toaster.toasterName)}
        </ToastText>
        <View className="ml-2 rounded-full p-0.5">
          <Ionicons name="close" size={14} color="#1c1917" />
        </View>
      </Pressable>
    </Animated.View>
  )
}

export default MessageRecipientListItem
