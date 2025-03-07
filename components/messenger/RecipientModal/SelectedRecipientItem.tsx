import { View, Text } from "react-native"
import React from "react"
import Animated, { CurvedTransition, ZoomIn, ZoomOut } from "react-native-reanimated"
import CrossButton from "@/components/general/CrossButton"
import { Image } from "expo-image"
import images from "@/constants/images"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { BefriendedToaster } from "@/types/types"
import { ToastText } from "@/components/general/ToastText"

type SelectedRecipientItemProps = {
  toaster: BefriendedToaster
}

const SelectedRecipientItem = ({ toaster }: SelectedRecipientItemProps) => {
  const processName = (name: string) => {
    const maxCharacters = 9
    if (name.length > maxCharacters) {
      return `${name.substring(0, maxCharacters).trimEnd()}...`
    } else {
      return name
    }
  }
  const { toggleToasterSelection } = useMessagingToasters()
  return (
    <Animated.View
      entering={ZoomIn.duration(100)}
      layout={CurvedTransition.duration(80)}
      exiting={ZoomOut.duration(100)}
      className="flex-col h-full justify-center items-center mx-3 gap-1 min-w-[78px]"
    >
      <View className="size-[50px] relative mt-2">
        <View className="absolute right-[-5px] top-[-5px]">
          <CrossButton
            backgroundColor="#6b7280"
            size={23}
            borderColor="#ffffff"
            borderWidth={1}
            onPress={() => toggleToasterSelection(toaster)}
          />
        </View>

        <View className="border-black border-[1px] rounded-full overflow-hidden">
          <Image
            source={images.hoofd}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            cachePolicy="memory-disk"
            transition={0}
          />
        </View>
      </View>
      <ToastText className="text-sm tracking-tighter">{processName(toaster.toasterName)}</ToastText>
    </Animated.View>
  )
}

export default SelectedRecipientItem
