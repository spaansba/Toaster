import { ToastText } from "@/components/general/ToastText"
import images from "@/constants/images"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { CardToaster } from "@/types/types"
import { LegendList, type LegendListRef } from "@legendapp/list"
import { Image } from "expo-image"
import React, { useEffect, useLayoutEffect, useRef } from "react"
import { TouchableOpacity, View, Text, Pressable } from "react-native"
import Animated, {
  CurvedTransition,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  FlipInEasyX,
  Layout,
  LinearTransition,
  ZoomIn,
  ZoomInEasyUp,
  ZoomInUp,
  ZoomOut,
} from "react-native-reanimated"

const SelectedRecipientList = () => {
  const { selectedToasters, toggleToasterSelection } = useMessagingToasters()
  const legendListRef = useRef<LegendListRef>(null)
  const prevSelectedToasterCountRef = useRef(selectedToasters.length)

  // On adding a new item (not deleting) to the list scroll to the end of the list
  useEffect(() => {
    const currentCount = selectedToasters.length
    if (currentCount > prevSelectedToasterCountRef.current && currentCount > 0) {
      //Wait for painting to be completed to set the index
      requestAnimationFrame(() => {
        legendListRef.current?.scrollToIndex({
          index: selectedToasters.length - 1,
          animated: true,
          viewPosition: 1,
        })
      })
    }
    prevSelectedToasterCountRef.current = currentCount
  }, [selectedToasters])

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
        layout={CurvedTransition.duration(150)}
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
        {selectedToasters.length > 0 ? (
          <LegendList
            ref={legendListRef}
            style={{
              minHeight: 100,
              borderRadius: 8,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 2,
              width: "100%",
            }}
            data={selectedToasters}
            renderItem={renderSelectedItem}
            keyExtractor={(item) => item.toaster_id}
            horizontal={true}
            estimatedItemSize={110}
          />
        ) : (
          <View
            style={{
              minHeight: 100,
              borderRadius: 8,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 2,
              width: "100%",
            }}
          >
            <Animated.View
              entering={FadeInDown.duration(300)}
              className="w-full h-[100px] justify-center items-center"
            >
              <ToastText className="text-gray-400 text-base">No recipients selected</ToastText>
              <ToastText className="text-gray-400 text-sm mt-1">
                Select recipients to start Toasting
              </ToastText>
            </Animated.View>
          </View>
        )}
      </Animated.View>
    </>
  )
}

export default SelectedRecipientList
