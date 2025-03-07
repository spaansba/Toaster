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
    if (!filteredToasterList.length) {
      return [] // Shows the ListEmptyComponent
    }
    return [
      {
        title: "Connections",
        data: [...filteredToasterList].sort((a, b) => a.toasterName.localeCompare(b.toasterName)), // sort a-z
      },
    ]
  }

  const createUnfilteredSectionList = (): ToasterSectionListData[] => {
    if (!filteredToasterList.length) {
      return [] // Shows the ListEmptyComponent
    }

    // Group toasters by favorite status without sorting alphabetically
    const favorites = filteredToasterList.filter((toaster) => toaster.favorite)
    const regularToasters = filteredToasterList.filter((toaster) => !toaster.favorite)

    // Create sections array with proper structure
    const sections: ToasterSectionListData[] = []

    // Only add sections that have data
    if (favorites.length > 0) {
      sections.push({
        title: "Favorites",
        data: favorites,
      })
    }

    if (regularToasters.length > 0) {
      sections.push({
        title: "Toasters",
        data: regularToasters,
      })
    }

    return sections
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
        <ToastText className="font-courier-bold bg-primary-200 py-3">{title}</ToastText>
      )}
      //TODO: add a button to add a new toaster here
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
