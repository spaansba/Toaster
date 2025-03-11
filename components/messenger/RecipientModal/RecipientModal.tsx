import SearchBar from "@/components/general/SearchBar"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import { useState } from "react"
import { Modal, View } from "react-native"
import RecipientSectionList from "./RecipientList/RecipientSectionList"
import RecipientModalHeaders from "./RecipientModalHeaders"
import ModalSelectedRecipientList from "./SelectedList/ModalSelectedRecipientList"

const RecipientModal = () => {
  const isModalVisible = useRecipientsStore((state) => state.RecipientSelectorModalVisibility)
  const HideModal = useRecipientsStore((state) => state.HideRecipientSelectorModal)
  const [searchQuery, setSearchQuery] = useState("")
  const allRecipients = useRecipientsStore((state) => state.AllRecipients)
  const isFiltered = searchQuery.length > 0

  const getFilteredList = () => {
    return allRecipients.filter((toaster) => {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()

      // Check if toaster name includes search query
      if (toaster.toasterName.toLowerCase().includes(lowerCaseSearchQuery)) {
        return true
      }

      // Check if any connected user's username includes search query
      return toaster.connectedUsers.some((user) =>
        user.username.toLowerCase().includes(lowerCaseSearchQuery)
      )
    })
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={() => HideModal()}
    >
      <View className="h-full p-4 bg-primary-200">
        <RecipientModalHeaders
          onCancelPress={() => HideModal()}
          onFinishPress={() => HideModal()}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <View className="mb-4">
          <ModalSelectedRecipientList ShowDeleteAllButton={true} />
        </View>

        <RecipientSectionList
          filteredToasterList={!isFiltered ? allRecipients : getFilteredList()}
          isFiltered={isFiltered}
        />
      </View>
    </Modal>
  )
}

export default RecipientModal
