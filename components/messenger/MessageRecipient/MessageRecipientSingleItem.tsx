import ConnectedUsersPictures from "@/components/ConnectedUsersPictures"
import { ToastText } from "@/components/general/ToastText"
import ProfilePicture from "@/components/ProfilePicture"
import { getRelativeTime } from "@/helpers/GetRelativeTime"
import type { BefriendedToaster } from "@/types/types"
import React from "react"
import { Pressable, View } from "react-native"

type MessageRecipientSingleItemProps = {
  toaster: BefriendedToaster
  onToasterPress: (toaster: BefriendedToaster) => void
}

const MessageRecipientSingleItem = ({
  toaster,
  onToasterPress,
}: MessageRecipientSingleItemProps) => {
  return (
    <Pressable onPress={() => onToasterPress(toaster)} className="flex-row mx-[6px] h-full ">
      {({ pressed }) => (
        <>
          <View className={`flex-row mr-auto`}>
            <ProfilePicture />
            <View className="ml-2">
              <ToastText
                className="font-courier-bold mb-[-4px] mt-[-3px] text-lg"
                numberOfLines={1}
              >
                {toaster.toasterName}
              </ToastText>

              <ToastText className="text-sm text-toast-muted " numberOfLines={1}>
                {getRelativeTime(toaster.lastSendToast)}
              </ToastText>
            </View>
          </View>

          <View className="mr-[6px] mt-[2px]">
            <ConnectedUsersPictures
              connectedUsers={toaster.connectedUsers}
              backgroundColor={"#fff3e1"}
            />
          </View>
        </>
      )}
    </Pressable>
  )
}

export default MessageRecipientSingleItem
