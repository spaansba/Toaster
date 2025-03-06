import { ToastText } from "@/components/general/ToastText"
import images from "@/constants/images"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { CardToaster } from "@/types/types"
import { Ionicons } from "@expo/vector-icons"
import { LegendList, type LegendListRef } from "@legendapp/list"
import { Image } from "expo-image"
import React, { useEffect, useLayoutEffect, useRef } from "react"
import { Pressable, Text, View } from "react-native"
import Animated, {
  CurvedTransition,
  FadeInDown,
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated"

const SelectedRecipientList = () => {
  const { selectedToasters, toggleToasterSelection, removeAllSelectedToasters } =
    useMessagingToasters()

  const renderSelectedItem = ({ item, index }: { item: CardToaster; index: number }) => {
    const processName = (name: string) => {
      const maxCharacters = 9
      if (name.length > maxCharacters) {
        return `${name.substring(0, maxCharacters).trimEnd()}...`
      } else {
        return name
      }
    }

    const handleRemove = () => {
      toggleToasterSelection(item)
    }

    return (
      <Animated.View
        entering={ZoomIn.duration(100)}
        layout={CurvedTransition.duration(80)}
        exiting={ZoomOut.duration(100)}
        className="flex-col h-full justify-center items-center mx-3 gap-1 min-w-[78px]"
      >
        <View className="size-[50px] relative mt-2">
          <Pressable
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            onPress={handleRemove}
            className="absolute size-[23px] rounded-full right-[-5px] top-[-5px] bg-gray-500 z-10 flex justify-center items-center border-white border-[1px] shadow-sm"
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                lineHeight: 16,
              }}
            >
              ✕
            </Text>
          </Pressable>
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
        <ToastText className="text-sm tracking-tighter">{processName(item.toaster_name)}</ToastText>
      </Animated.View>
    )
  }

  return (
    <>
      <Animated.View layout={LinearTransition.duration(300)}>
        <View className="min-h-[105px] relative rounded-lg bg-white border-2 border-black w-full mt-2">
          {selectedToasters.length > 0 ? (
            <>
              <Pressable
                onPress={removeAllSelectedToasters}
                className="bg-danger absolute w-[30px] flex justify-center items-center h-[30px] rounded-xl border-black border-2 right-[-10px] top-[-10px] z-30"
              >
                <Ionicons name="trash-outline" size={18}></Ionicons>
              </Pressable>
              <LegendList
                data={selectedToasters}
                renderItem={renderSelectedItem}
                keyExtractor={(item) => item.toaster_id}
                horizontal={true}
                estimatedItemSize={105}
              />
            </>
          ) : (
            <Animated.View
              entering={FadeInDown.duration(300)}
              className="w-full h-[100px] justify-center items-center"
            >
              <ToastText className="text-gray-400 text-base">No recipients selected</ToastText>
              <ToastText className="text-gray-400 text-sm mt-1">
                Select recipients to start Toasting
              </ToastText>
            </Animated.View>
          )}
        </View>
      </Animated.View>
    </>
  )
}

export default SelectedRecipientList
