import ConnectedUsersPictures from "@/components/ConnectedUsersPictures"
import { ToastText } from "@/components/general/ToastText"
import ConnectedToaster from "@/components/profile/ConnectedToaster"
import ProfilePicture from "@/components/ProfilePicture"
import { getRelativeTime } from "@/helpers/GetRelativeTime"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import type { BefriendedToaster } from "@/types/types"
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, View } from "react-native"
import Animated from "react-native-reanimated"

type MessageRecipientSingleItemProps = {
  toaster: BefriendedToaster
}

const MessageRecipientSingleItem = ({ toaster }: MessageRecipientSingleItemProps) => {
  return (
    <View className="flex-row mx-[6px] h-full ">
      {/* Left section with profile picture and text */}
      <View className="flex-row mr-auto">
        <ProfilePicture />
        <View className="ml-2">
          <ToastText className="font-courier-bold mb-[-4px] mt-[-3px] text-lg" numberOfLines={1}>
            {toaster.toasterName}
          </ToastText>

          <ToastText className="text-sm text-toast-muted " numberOfLines={1}>
            {getRelativeTime(toaster.lastSendMessage)}
          </ToastText>
        </View>
      </View>

      {/* Right section with cancel button */}
      <View className="mr-[6px] mt-[2px]">
        <ConnectedUsersPictures
          connectedUsers={toaster.connectedUsers}
          backgroundColor={"#fff3e1"}
        />
      </View>
    </View>
  )
}

export default MessageRecipientSingleItem
