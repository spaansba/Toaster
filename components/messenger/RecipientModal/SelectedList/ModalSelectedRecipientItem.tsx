import CrossButton from "@/components/general/CrossSquare"
import { ToastText } from "@/components/general/ToastText"
import ProfilePicture from "@/components/ProfilePicture"
import { TruncateString } from "@/helpers/TruncateString"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import type { BefriendedToaster } from "@/types/types"
import React from "react"
import { Pressable, View } from "react-native"
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
      className="flex-col h-full justify-center items-center gap-1 w-[70px] mx-[4px]"
    >
      <Pressable onPress={() => ToggleToasterSelection(toaster)}>
        {({ pressed }) => (
          <View className={`${pressed ? "opacity-press" : ""}`}>
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
            <ToastText className="text-sm tracking-tighter text-center max-w-[60px]">
              {TruncateString(toaster.toasterName, 9, false)}
            </ToastText>
          </View>
        )}
      </Pressable>
    </Animated.View>
  )
}

export default SelectedRecipientItem
