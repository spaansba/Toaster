import CrossButton from "@/components/general/CrossButton"
import { ToastText } from "@/components/general/ToastText"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"

import { Ionicons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import { Modal, View, TouchableOpacity, TextInput } from "react-native"
import RecipientSectionList from "./RecipientSectionList"
import SelectedRecipientList from "./SelectedRecipientList"
import type { BefriendedToaster } from "@/types/types"

type RecipientBottomSheetProps = {
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientModal = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const { availableToasters, selectedToasters } = useMessagingToasters()
  const isFiltered = searchQuery.length > 0
  const getFilteredList = () => {
    return availableToasters.filter((toaster) => {
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
        <View className="flex-row justify-between items-center mb-6">
          {/* Headers */}
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Cancel</ToastText>
          </TouchableOpacity>

          <View className="flex-col items-center">
            <ToastText>ADD RECIPIENTS</ToastText>
            <ToastText>{`${selectedToasters.length}/63`}</ToastText>
          </View>

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Finish</ToastText>
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View className="flex-row items-center bg-gray-200 rounded-lg px-3 mb-4">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="ml-2 flex-1"
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            style={{
              fontFamily: "Courier",
              fontSize: 16,
              height: 40,
              padding: 0,
              margin: 0,
              textAlignVertical: "center",
            }}
          />
          {searchQuery.length > 0 && (
            <CrossButton backgroundColor="#6b7280" onPress={() => setSearchQuery("")} />
          )}
        </View>

        <View className="mb-4">
          <SelectedRecipientList />
        </View>

        {/* Give flex-1 to this container to allow proper scrolling */}
        <View className="flex-1">
          <RecipientSectionList
            filteredToasterList={!isFiltered ? availableToasters : getFilteredList()}
            isFiltered={isFiltered}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientModal
