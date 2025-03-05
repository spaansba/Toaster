import { View, Text, SectionList } from "react-native"
import React, { useCallback } from "react"
import type { CardToaster, ToasterSectionListData } from "@/types/types"
import ToasterCard from "../ToasterCard"
import { ToastText } from "@/components/general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"

const RecipientSectionList = () => {
  const { availableToasters, selectedToasters, setSelectedToasters } = useMessagingToasters()

  // Organizes toasters into alphabetical sections based on the first letter of their names.
  const createSectionList = (): ToasterSectionListData[] => {
    const sectionsObj: Record<string, CardToaster[]> = {}
    availableToasters.forEach((toaster) => {
      const letter = toaster.toasterName.charAt(0).toUpperCase()

      if (!sectionsObj[letter]) {
        sectionsObj[letter] = []
      }

      sectionsObj[letter].push(toaster)
    })
    return Object.keys(sectionsObj)
      .sort()
      .map((letter) => ({
        title: letter,
        data: sectionsObj[letter],
      }))
  }

  const handleItemPress = (item: CardToaster) => {
    setSelectedToasters((prev) => {
      const isAlreadySelected = prev.some((selectedItem) => selectedItem.id === item.id)

      if (isAlreadySelected) {
        return prev.filter((selectedItem) => selectedItem.id !== item.id)
      } else {
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
      section: ToasterSectionListData
    }) => {
      const isFirst = index === 0
      const isLast = index === section.data.length - 1
      const isSelected = selectedToasters.some((selectedItem) => selectedItem.id === item.id)
      return (
        <ToasterCard
          data={item}
          isFirst={isFirst}
          isLast={isLast}
          isSelected={isSelected}
          onPress={() => handleItemPress(item)}
        />
      )
    },
    []
  )
  return (
    <SectionList
      sections={createSectionList()}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      renderSectionHeader={({ section: { title } }) => (
        <View className="">
          <ToastText className="font-courier-bold bg-primary-200 py-2">{title}</ToastText>
        </View>
      )}
      ListFooterComponent={() => <View className="h-[40px]"></View>}
    />
  )
}

export default RecipientSectionList
