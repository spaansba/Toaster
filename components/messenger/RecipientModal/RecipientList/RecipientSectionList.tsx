import { ToastText } from "@/components/general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"
import type { BefriendedToaster, ToasterSectionListData } from "@/types/types"
import React from "react"
import { SectionList, View } from "react-native"
import ToasterCard from "./ToasterCard"

type RecipientSectionListProps = {
  filteredToasterList: BefriendedToaster[]
  isFiltered: boolean
}

const RecipientSectionList = ({ filteredToasterList, isFiltered }: RecipientSectionListProps) => {
  const { selectedToasters, toggleToasterSelection } = useMessagingToasters()

  //Create set for faster lookups
  const selectedToasterIds = new Set(selectedToasters.map((toaster) => toaster.toasterId))

  const createFilteredSectionList = (): ToasterSectionListData[] => {
    const toastersToUse = filteredToasterList || []
    return [
      {
        title: "Connections",
        data: [...toastersToUse].sort((a, b) => a.toasterName.localeCompare(b.toasterName)), // sort a-z
      },
    ]
  }

  const createUnfilteredSectionList = (): ToasterSectionListData[] => {
    const sectionsObj: Record<string, BefriendedToaster[]> = {}
    filteredToasterList.forEach((toaster) => {
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

  const renderItem = ({
    item,
    index,
    section,
  }: {
    item: BefriendedToaster
    index: number
    section: ToasterSectionListData
  }) => {
    const isFirst = index === 0
    const isLast = index === section.data.length - 1
    const isSelected = selectedToasterIds.has(item.toasterId)

    return (
      <ToasterCard
        data={item}
        isFirst={isFirst}
        isLast={isLast}
        isSelected={isSelected}
        onPress={() => toggleToasterSelection(item)}
      />
    )
  }
  return (
    <SectionList
      sections={isFiltered ? createFilteredSectionList() : createUnfilteredSectionList()}
      renderItem={renderItem}
      keyExtractor={(toaster) => toaster.toasterId}
      renderSectionHeader={({ section: { title } }) => (
        <View className="">
          <ToastText className="font-courier-bold bg-primary-200 py-2">{title}</ToastText>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className="items-center py-4">
          <ToastText>No toasters found</ToastText>
        </View>
      )}
      ListFooterComponent={() => <View className="h-[40px]"></View>}
    />
  )
}

export default RecipientSectionList
