import { Modal, Pressable, View, TextInput, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { ToastText } from "../../general/ToastText"
import Ionicons from "@expo/vector-icons/Ionicons"
import type { CardToaster, userSectionListData } from "@/types/types"
import RecipientSectionList from "./RecipientSectionList"
import SelectedRecipientList from "./SelectedRecipientList"

type RecipientBottomSheetProps = {
  connectedToasters: userSectionListData[]
  title: string
  isModalVisible: boolean
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const RecipientModal = ({
  connectedToasters,
  isModalVisible,
  setIsModalVisible,
}: RecipientBottomSheetProps) => {
  const [searchText, setSearchText] = useState("")
  const [selectedToasters, setSelectedToasters] = useState<CardToaster[]>([])

  const handleIsVisible = () => {
    setIsModalVisible((prev) => !prev)
  }

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

          <View className="flex-col items-center absolute inset-x-0 mx-auto">
            <ToastText>ADD RECIPIENTS</ToastText>
            <ToastText>0/63</ToastText>
          </View>

          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <ToastText className="font-courier-bold text-xl">Finish</ToastText>
          </TouchableOpacity>
        </View>

        {/* SearchBar */}
        <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-4">
          <Ionicons name="search-outline" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 font-courier text-base"
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
        <View className="mb-5">
          <SelectedRecipientList
            selectedToasters={selectedToasters}
            setSelectedToasters={setSelectedToasters}
          />
        </View>
        <View>
          <RecipientSectionList
            connectedToasters={connectedToasters}
            setSelectedToasters={setSelectedToasters}
          />
        </View>
      </View>
    </Modal>
  )
}

export default RecipientModal
