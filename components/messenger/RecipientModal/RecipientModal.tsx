import SearchBar from "@/components/general/SearchBar"
import { useRecipientsStore } from "@/providers/RecipientsStore"
import { useState } from "react"
import { Modal, View } from "react-native"
import RecipientSectionList from "./RecipientList/RecipientSectionList"
import RecipientModalHeaders from "./RecipientModalHeaders"
import SelectedRecipientList from "./SelectedList/SelectedRecipientList"

type RecipientBottomSheetProps = {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientModal = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
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
      onRequestClose={() => setIsModalVisible((prev) => !prev)}
    >
      <View className="h-full p-4 bg-primary-200">
        <RecipientModalHeaders
          onCancelPress={() => setIsModalVisible(false)}
          onFinishPress={() => setIsModalVisible(false)}
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <View className="mb-4">
          <SelectedRecipientList />
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
