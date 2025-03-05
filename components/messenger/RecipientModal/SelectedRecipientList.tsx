import { View, Text } from "react-native"
import React, { useCallback } from "react"
import { LegendList } from "@legendapp/list"
import images from "@/constants/images"
import type { CardToaster } from "@/types/types"
import { Image } from "expo-image"

type SelectedRecipientList = {
  selectedToasters: CardToaster[]
  setSelectedToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
}

const SelectedRecipientList = ({
  selectedToasters,
  setSelectedToasters,
}: SelectedRecipientList) => {
  const renderSelectedItem = useCallback(
    ({ item, index }: { item: CardToaster; index: number }) => {
      const isFirst = index === 0
      return (
        <View className="flex-col">
          <View className="border-black border-[1px] size-[35px] rounded-full overflow-hidden">
            <Image
              source={images.hoofd}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              cachePolicy="memory-disk"
              transition={0}
            />
          </View>
        </View>
      )
    },
    []
  )
  return (
    <LegendList
      style={{ backgroundColor: "white", height: 50 }}
      data={selectedToasters}
      renderItem={renderSelectedItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
    />
  )
}

export default SelectedRecipientList
