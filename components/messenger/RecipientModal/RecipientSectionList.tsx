import { ToastText } from "@/components/general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { CardToaster, ToasterSectionListData } from "@/types/types"
import React from "react"
import { SectionList, View } from "react-native"
import ToasterCard from "../ToasterCard"

const RecipientSectionList = () => {
  const { availableToasters, selectedToasters, toggleToasterSelection } = useMessagingToasters()

  // Organizes toasters into alphabetical sections based on the first letter of their names.
  const createSectionList = (): ToasterSectionListData[] => {
    const sectionsObj: Record<string, CardToaster[]> = {}
    availableToasters.forEach((toaster) => {
      const letter = toaster.toaster_name.charAt(0).toUpperCase()

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

  const handleItemPress = (toaster: CardToaster) => {
    toggleToasterSelection(toaster)
  }

  // Memoize the render item function
  const renderItem = ({
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
    const isSelected = selectedToasters.some(
      (selectedToaster) => selectedToaster.toaster_id === item.toaster_id
    )

    return (
      <ToasterCard
        data={item}
        isFirst={isFirst}
        isLast={isLast}
        isSelected={isSelected}
        onPress={() => handleItemPress(item)}
      />
    )
  }
  return (
    <SectionList
      sections={createSectionList()}
      renderItem={renderItem}
      keyExtractor={(toaster) => toaster.toaster_id}
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
