import CrossButton from "@/components/general/CrossButton"
import { ToastText } from "@/components/general/ToastText"
import ProfilePicture from "@/components/ProfilePicture"
import { TruncateString } from "@/helpers/TruncateString"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import type { BefriendedToaster } from "@/types/types"
import React from "react"
import { View } from "react-native"
import Animated, { CurvedTransition, ZoomIn, ZoomOut } from "react-native-reanimated"

type SelectedRecipientItemProps = {
  toaster: BefriendedToaster
}

const SelectedRecipientItem = ({ toaster }: SelectedRecipientItemProps) => {
  const ToggleToasterSelection = useRecipientsStore((state) => state.ToggleSelectedRecipient)

  return (
    <Animated.View
      entering={ZoomIn.duration(100)}
      layout={CurvedTransition.duration(80)}
      exiting={ZoomOut.duration(100)}
      className="flex-col h-full justify-center items-center gap-1 min-w-[70px] mx-[6px]"
    >
      <View className="size-[60px] relative mt-2">
        <View className="absolute right-[-5px] top-[-5px]">
          <CrossButton
            size={20}
            borderColor="#FFFFFF"
            onPress={() => {
              ToggleToasterSelection(toaster)
            }}
          />
        </View>
        <ProfilePicture size={60} borderWidth={2} />
      </View>
      <ToastText className="text-sm tracking-tighter">
        {TruncateString(toaster.toasterName)}
      </ToastText>
    </Animated.View>
  )
}

export default SelectedRecipientItem
