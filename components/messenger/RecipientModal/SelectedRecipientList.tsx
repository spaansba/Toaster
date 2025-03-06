import images from "@/constants/images"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { CardToaster } from "@/types/types"
import { LegendList } from "@legendapp/list"
import { Image } from "expo-image"
import React from "react"
import { View } from "react-native"

const SelectedRecipientList = () => {
  const { selectedToasters } = useMessagingToasters()
  const renderSelectedItem = ({ item, index }: { item: CardToaster; index: number }) => {
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
  }
  return (
    <LegendList
      style={{ backgroundColor: "white", height: 50 }}
      data={selectedToasters}
      renderItem={renderSelectedItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      estimatedItemSize={35}
    />
  )
}

export default SelectedRecipientList
