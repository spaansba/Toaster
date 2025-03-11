import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import type { BefriendedToaster } from "@/types/types"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import ProfilePicture from "@/components/ProfilePicture"
import { ToastText } from "@/components/general/ToastText"
import { Ionicons } from "@expo/vector-icons"
import { TruncateString } from "@/helpers/TruncateString"

type MessageRecipientItemProps = {
  toaster: BefriendedToaster
}

const MessageRecipientItem = ({ toaster }: MessageRecipientItemProps) => {
  const toggleRecipient = useRecipientsStore((state) => state.ToggleSelectedRecipient)

  return (
    <TouchableOpacity
      key={toaster.toasterId}
      onPress={() => toggleRecipient(toaster)}
      className="flex-row items-center px-2 py-1.5"
    >
      <ProfilePicture />
      <ToastText className="text-sm mr-2">{TruncateString(toaster.toasterName)}</ToastText>
      <View className="rounded-full p-0.5">
        <Ionicons name="close" size={14} color="#1c1917" />
      </View>
    </TouchableOpacity>
  )
}

export default MessageRecipientItem
