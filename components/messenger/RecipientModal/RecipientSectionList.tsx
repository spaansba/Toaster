import { View, Text, SectionList } from "react-native"
import React, { useCallback } from "react"
import type { CardToaster, userSectionListData } from "@/types/types"
import ToasterCard from "../ToasterCard"
import { ToastText } from "@/components/general/ToastText"

type RecipientSectionListProps = {
  connectedToasters: userSectionListData[]
  setSelectedToasters: React.Dispatch<React.SetStateAction<CardToaster[]>>
}

const RecipientSectionList = ({
  connectedToasters,
  setSelectedToasters,
}: RecipientSectionListProps) => {
  const handleItemPress = (item: CardToaster) => {
    setSelectedToasters((prev) => {
      // Check if this item is already in the selectedToastes array
      const isAlreadySelected = prev.some((selectedItem) => selectedItem.id === item.id)

      if (isAlreadySelected) {
        // If already selected, remove it from the array
        return prev.filter((selectedItem) => selectedItem.id !== item.id)
      } else {
        // If not selected, add it to the array
        return [...prev, item]
      }
    })
    console.log("Item pressed:", item)
  }
  // Memoize the render item function
  const renderItem = useCallback(
    ({
      item,
      index,
      section,
    }: {
      item: CardToaster
      index: number
      section: userSectionListData
    }) => {
      const isFirst = index === 0
      const isLast = index === section.data.length - 1
      return (
        <ToasterCard
          data={item}
          isFirst={isFirst}
          isLast={isLast}
          onPress={() => handleItemPress(item)}
        />
      )
    },
    []
  )
  return (
    <SectionList
      sections={connectedToasters}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title } }) => (
        <View className="">
          <ToastText className="font-courier-bold bg-primary-200">{title}</ToastText>
        </View>
      )}
    />
  )
}

export default RecipientSectionList
