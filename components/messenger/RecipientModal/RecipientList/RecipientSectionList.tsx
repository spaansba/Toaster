import { ToastText } from "@/components/general/ToastText"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import type { BefriendedToaster, ToasterSectionListData } from "@/types/types"
import React from "react"
import { SectionList, View } from "react-native"
import ToasterCard from "./ToasterCard"

type RecipientSectionListProps = {
  filteredToasterList: BefriendedToaster[]
  isFiltered: boolean
}

const RecipientSectionList = ({ filteredToasterList, isFiltered }: RecipientSectionListProps) => {
  const selectedRecipients = useRecipientsStore((state) => state.SelectedRecipients)
  const ToggleToasterSelection = useRecipientsStore((state) => state.ToggleSelectedRecipient)

  //Create set for faster lookups
  const selectedToasterIds = new Set(selectedRecipients.map((toaster) => toaster.toasterId))

  const createFilteredSectionList = (): ToasterSectionListData[] => {
    if (!filteredToasterList.length) {
      return [] // Shows the ListEmptyComponent
    }
    return [
      {
        title: "Connections",
        data: [...filteredToasterList].sort((a, b) => a.toasterName.localeCompare(b.toasterName)),
      },
    ]
  }

  const createUnfilteredSectionList = (): ToasterSectionListData[] => {
    if (!filteredToasterList.length) {
      return [] // Shows the ListEmptyComponent
    }

    const favorites = filteredToasterList.filter((toaster) => toaster.favorite)
    const regularToasters = filteredToasterList.filter((toaster) => !toaster.favorite)

    const sections: ToasterSectionListData[] = []

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

  return (
    <SectionList
      sections={isFiltered ? createFilteredSectionList() : createUnfilteredSectionList()}
      renderItem={({ item, index, section }) => (
        <ToasterCard
          data={item}
          isFirst={index === 0}
          isLast={index === section.data.length - 1}
          isSelected={selectedToasterIds.has(item.toasterId)}
          onPress={() => ToggleToasterSelection(item)}
        />
      )}
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
      ListFooterComponent={() => <View className="h-[90px]"></View>}
    />
  )
}

export default RecipientSectionList
