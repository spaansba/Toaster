import Ionicons from "@expo/vector-icons/Ionicons"
import React, { useState } from "react"
import { Modal, Pressable, TextInput, TouchableOpacity, View } from "react-native"
import { ToastText } from "../../general/ToastText"
import RecipientSectionList from "./RecipientSectionList"
import SelectedRecipientList from "./SelectedRecipientList"
import { useMessagingToasters } from "@/providers/SelectedRecipientProvider"

type RecipientBottomSheetProps = {
  title: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientModal = ({ isModalVisible, setIsModalVisible }: RecipientBottomSheetProps) => {
  const [searchText, setSearchText] = useState("")
  const handleIsVisible = () => {
    setIsModalVisible((prev) => !prev)
  }
  const { selectedToasters } = useMessagingToasters()

  return (
    <Modal
      animationType="slide"
      presentationStyle="pageSheet"
      visible={isModalVisible}
      onRequestClose={handleIsVisible}
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
        <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-4">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="ml-2 font-courier text-base flex-1"
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
          {searchText.length > 0 && (
            <Pressable onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </Pressable>
          )}
        </View>

        <View className="mb-4">
          <SelectedRecipientList />
        </View>

        {/* Give flex-1 to this container to allow proper scrolling */}
        <View className="flex-1">
          <RecipientSectionList />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientModal
